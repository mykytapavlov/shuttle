class CSVReader extends FileReader{
    /* 
    On succeful load of file creates JSON object 
    for each line in CSV file and stores it in array:
    this.data = [{"column": "value"}, {"column": "value"}]
    */
    constructor(){
        super();
        this.data = [];
        this.onload = this.handleOnload.bind(this);
    }

    handleOnload(event){
        const text = event.target.result;
        const [firstLine, ...lines] = text.split('\n');
        const columnNames = firstLine.split(',');
        lines.forEach(line => {
            const values = line.split(',');
            let row = {};
            for (let i = 0; i < columnNames.length; i++){
                row[columnNames[i]] = values[i];
            }
            this.data.push(JSON.stringify(row));
        });
    }
}


class FileManager{
    static readFilesCSV(files){
        /*
        Reads multiple CSV files and returns dictionary:
        result = {
            "file_name_1": [{"column": "value"}, {"column": "value"}],
            "file_name_2": [{"column": "value"}, {"column": "value"}],
        }
        */
        let result = {};
        for (let i = 0; i < files.length; i++){
            (function(file){
                result[file.name] = []
                const reader = new CSVReader()
                reader.readAsText(file, "UTF-8");
                result[file.name] = reader.data;
            })(files[i]);
        }
        return result;
    }
}


(function main() {
    const fileSelector = document.getElementById('file-selector');
    fileSelector.addEventListener('change', (event) => {
        const files = event.target.files;
        const result = FileManager.readFilesCSV(files)
        console.log('Files: ', result)
    });
})();