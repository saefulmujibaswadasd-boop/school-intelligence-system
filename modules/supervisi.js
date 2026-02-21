function hitungIKP(){

let admin = parseFloat(document.getElementById("admin").value);
let pembelajaran = parseFloat(document.getElementById("pembelajaran").value);

if(isNaN(admin) || isNaN(pembelajaran)){
document.getElementById("hasil").innerText = "Masukkan skor dengan benar.";
return;
}

let ikp = ((admin + pembelajaran)/2)*20;

document.getElementById("hasil").innerText = "Nilai IKP Guru: " + ikp.toFixed(2);

}
