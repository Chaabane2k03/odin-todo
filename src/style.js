//Footer :
document.getElementById("liveToastBtn").onclick=function(){
    var myAlert = document.getElementById('liveToast');
    var bsAlert = new bootstrap.Toast(myAlert);
    bsAlert.show();
}