/*
Ryan Lee CS382-LD Assembler
I pledge my honor that I have abided by the Stevens Honor System.
*/
import { readFileSync, writeFileSync } from 'fs';
function main() {
    let file = readFileSync(process.argv[2],
            {encoding:'utf8', flag:'r'});
    let imgData = 'v3.0 hex words addressed\n00: ';
    let rows = ['10', '20', '30', '40', '50', '60', '70', '80',
    '90', 'a0', 'b0', 'c0', 'd0', 'e0', 'f0'];
    let instructNum = 1;
    let rowNum = 0;

    file = file.split('\n');
    for (let i = 0; i < file.length; i ++) {
        if (file[i] == "\r" || file[i] == "") { // skip empty lines
            continue;
        }
        let instruct = file[i].split(" ");
        instruct[2] = instruct[2].replace("\r", "");
        if (instructNum % 15 == 0) { // next row
            imgData += "\n" + rows[rowNum] + ": ";
            rowNum ++;
        }
        // console.log(instruct);

        if (instruct[0] == 'ADD') {
            imgData += '4'; // 0100B, 0x4 in image
            let num1 = parseInt(instruct[1].charAt(1));
            let num2 = parseInt(instruct[2].charAt(1));
            let result = (num1 << 2) + num2;
            imgData += result.toString(16); // Rn with Rm
            imgData += '00 '; // imm8 = 0
        }
        else if (instruct[0] == 'SUB') {
            instructNum ++;
            imgData += '8'; // 1000B, 0x8 in image
            let num1 = parseInt(instruct[1].charAt(1));
            let num2 = parseInt(instruct[2].charAt(1));
            let result = (num1 << 2) + num2;
            imgData += result.toString(16); // Rn with Rm
            imgData += '00 '; // imm8 = 0
        } 
        else if (instruct[0] == 'MOV') {
            instructNum ++;
            imgData += 'c'; // 1100B, 0xC in image
            if (instruct[1] == 'X0') {imgData += '0';}
            else if (instruct[1] == 'X1') {imgData += '4';}
            else if (instruct[1] == 'X2') {imgData += '8';}
            else {imgData += 'c';} // X3
            imgData += instruct[2] + " "; // add imm8
        } 
        // console.log(imgData);
    }

    writeFileSync('instructImage', imgData);
}

main();







