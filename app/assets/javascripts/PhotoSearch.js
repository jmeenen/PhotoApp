function PhotoSearch(substring_field_ID,result_div_ID,url) {
    this.substring_field = document.getElementById(substring_field_ID);
    this.result_div = document.getElementById(result_div_ID);
    this.url = url;
    var obj = this;
    this.substring_field.addEventListener('keyup', function (event) {
            obj.keyUp(event);
        }
    );
}

PhotoSearch.prototype.keyUp = function(event) {
    var obj = this;
    var substring = this.substring_field.value;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                obj.result_div.innerHTML = this.responseText;
            }
            else {
                obj.result_div.innerHTML = "readystate error";
            }
        }
    }
    xhr.open("GET", this.url + substring);
    xhr.send();
}