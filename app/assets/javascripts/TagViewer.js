function TagViewer(tag_element_ID, name_div_ID, name) {
    this.tag_element = document.getElementById(tag_element_ID);
    this.name_div = document.getElementById(name_div_ID);
    this.name_div.style.display = "none";
    this.name = name;
    var obj = this;
    this.tag_element.addEventListener('mouseover', function (event) {
            obj.mouseOver(event);
        }
    );
    this.tag_element.addEventListener('mouseout', function (event) {
            obj.mouseOut(event);
        }
    );
}

TagViewer.prototype.mouseOver = function(event) {
    this.name_div.style.display = "initial";
    this.name_div.innerText = this.name;
    this.name_div.style.left = (this.tag_element.offsetLeft)+'px';
    this.name_div.style.top = (this.tag_element.offsetTop - 10)+'px';
}

TagViewer.prototype.mouseOut = function(event) {
    this.name_div.style.display = "none";
}