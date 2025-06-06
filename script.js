function applyArrayMethod() {
    const arrInput = document.getElementById("arrayInput").value;
    const method = document.getElementById("methodSelect").value;
    const param = document.getElementById("methodParam").value;
    const resultDiv = document.getElementById("result");

    let arr = arrInput.split(",").map(s => s.trim());

    for(let i=0; i<arr.length; i++) {
        if (!isNaN(arr[i]) && arr[i] !== "") arr[i] = Number(arr[i]);
    }

    let output;
    try {
        switch (method) {
            case "length":
                output = arr.length;
                break;

            case "push":
                if (param === "") {
                    resultDiv.innerHTML = "Enter value to push.";
                    resultDiv.style.color = "#800000";
                    return;
                }
                arr.push(param);
                output = arr;
                break;

            case "pop":
                output = arr.pop();
                break;

            case "shift":
                output = arr.shift();
                break;

            case "unshift":
                if (param === "") {
                    resultDiv.innerHTML = "Enter value to unshift.";
                    resultDiv.style.color = "#800000";
                    return;
                }
                arr.unshift(param);
                output = arr;
                break;

            case "indexOf":
                output = arr.indexOf(param);
                break;

            case "includes":
                output = arr.includes(param);
                break;

            case "join":
                output = arr.join(param || ",");
                break;

            case "reverse":
                output = arr.reverse();
                break;

            case "sort":
                output = arr.sort();
                break;

            case "slice":
                let sliceParams = param.split(",").map(x => parseInt(x.trim()));
                if (sliceParams.length < 1 || sliceParams.some(isNaN)) {
                    resultDiv.innerHTML = "Enter slice parameters as start,end (end optional).";
                    resultDiv.style.color = "#800000";
                    return;
                }
                output = arr.slice(sliceParams[0], sliceParams[1]);
                break;

            case "splice":
                let spliceParams = param.split(",").map(x => parseInt(x.trim()));
                if (spliceParams.length < 2 || spliceParams.some(isNaN)) {
                    resultDiv.innerHTML = "Enter splice parameters as start,deleteCount[,item1,item2,...].";
                    resultDiv.style.color = "#800000";
                    return;
                }
                let items = param.split(",").slice(2);
                output = arr.splice(spliceParams[0], spliceParams[1], ...items);
                break;

            case "concat":
                let concatArr = param.split(",").map(s => s.trim());
                output = arr.concat(concatArr);
                break;

            case "map":
                output = arr.map(x => {
                    if (!isNaN(x)) return x * 2;
                    else return x.toUpperCase();
                });
                break;

            case "filter":
                output = arr.filter(x => {
                    if (!isNaN(x)) return x > 10;
                    else return x.length > 3;
                });
                break;

            case "reduce":
                output = arr.reduce((acc, val) => {
                    if (!isNaN(val)) return acc + Number(val);
                    else return acc;
                }, 0);
                break;

            default:
                output = "Method not supported.";
        }

        if (Array.isArray(output)) {
            output = "[" + output.join(", ") + "]";
        }

        resultDiv.innerHTML = `Result: ${output}`;
        resultDiv.style.color = "#004080";

    } catch (e) {
        resultDiv.innerHTML = "Error: " + e.message;
        resultDiv.style.color = "#800000";
    }
}
