const notify = (fn, handler) => e => {
    fn(handler(e));
};


const post = rows => {
    console.log(rows);  // TODO: POST request instead
};


const parse = e => {
    const text = e.target.result;
    const [firstLine, ...lines] = text.split('\n');
    const columnNames = firstLine.split(',');
    const data = []
    lines.forEach(line => {
        if (line) {
            const values = line.split(',');
            let row = {};
            for (let i = 0; i < columnNames.length; i++) {
                row[columnNames[i]] = values[i];
            };
            data.push(JSON.stringify(row));
        };
    });
    return data;
};


const read = e => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
        ((file) => {
            const reader = new FileReader();
            reader.onload = notify(post, parse);
            reader.readAsText(file, "UTF-8");
        })(files[i]);
    };
};


const fileSelector = document.getElementById('file-selector');
fileSelector.onchange = read;
