from flask import Flask, request, jsonify
from flask_cors import CORS
from lecture4 import process_input
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/summarize', methods=['POST'])
def summarize():
    try:
        input_type = request.form.get("input_type")
        export_format = request.form.get("export_format")
        youtube_url = request.form.get("youtube_url", "")
        duration = int(request.form.get("duration", 60))

        if input_type == "file" and 'file' in request.files:
            file = request.files['file']
            filename = secure_filename(file.filename)
            filepath = os.path.join(UPLOAD_FOLDER, filename)
            file.save(filepath)
            result = process_input(source_type="file", file_path=filepath, export_format=export_format)
            os.remove(filepath)
        elif input_type == "youtube":
            result = process_input(source_type="youtube", youtube_url=youtube_url, export_format=export_format)
        elif input_type == "mic":
            result = process_input(source_type="mic", duration=duration, export_format=export_format)
        else:
            return jsonify({"error": "Invalid input type"}), 400

        if "error" in result:
            return jsonify(result), 500
        return jsonify(result)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
