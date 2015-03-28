function Tagger(element_ID, feedback_div_ID, x_ID, y_ID, width_ID, height_ID) {
    this.isMouseDown = false;
    this.element = document.getElementById(element_ID);
    this.feedback_div = document.getElementById(feedback_div_ID);
    this.x = document.getElementById(x_ID);
    this.y = document.getElementById(y_ID);
    this.width = document.getElementById(width_ID);
    this.height = document.getElementById(height_ID);
    var obj = this;
    this.element.addEventListener('mousedown', function (event) {
            obj.mouseDown(event);
        }
    );
}

Tagger.prototype.mouseDown = function(event) {
    event.preventDefault()
    var obj = this;
    this.oldMoveHandler = document.body.onmousemove;
    document.body.onmousemove = function(event) {
        obj.mouseMove(event);
    }
    this.oldUpHandler = document.body.onmouseup;
    document.body.onmouseup = function(event) {
        obj.mouseUp(event);
    }
    this.original_x = event.pageX;
    this.original_y = event.pageY;
    this.isMouseDown = true;
}

Tagger.prototype.mouseMove = function(event) {
    if (!this.isMouseDown) {
        return;
    }
    var height = this.element.offsetHeight;
    var width = this.element.offsetWidth;
    this.new_x = event.pageX;
    this.new_y = event.pageY;
    if (this.new_x < this.element.offsetLeft) {
        this.new_x = this.element.offsetLeft;
    } else if (this.new_x > this.element.offsetLeft + width) {
        this.new_x = this.element.offsetLeft + width;
    }
    if (this.new_y < this.element.offsetTop) {
        this.new_y = this.element.offsetTop;
    } else if (this.new_y > this.element.offsetTop + height) {
        this.new_y = this.element.offsetTop + height;
    }
    if (this.new_x >= this.original_x && this.new_y >= this.original_y) {
        this.width.value = this.new_x - this.original_x;
        this.height.value = this.new_y - this.original_y;
        this.x.value = this.original_x - this.element.offsetLeft;
        this.y.value = this.original_y - this.element.offsetTop;
    } else if (this.new_x >= this.original_x && this.new_y < this.original_y) {
        this.width.value = this.new_x - this.original_x;
        this.height.value = this.original_y - this.new_y;
        this.x.value = this.original_x - this.element.offsetLeft;
        this.y.value = this.new_y - this.element.offsetTop;
    } else if (this.new_x < this.original_x && this.new_y >= this.original_y) {
        this.width.value = this.original_x - this.new_x;
        this.height.value = this.new_y - this.original_y;
        this.x.value = this.new_x - this.element.offsetLeft;
        this.y.value = this.original_y - this.element.offsetTop;
    } else {
        this.width.value = this.original_x - this.new_x;
        this.height.value = this.original_y - this.new_y;
        this.x.value = this.new_x - this.element.offsetLeft;
        this.y.value = this.new_y - this.element.offsetTop;
    }
    this.feedback_div.style.left = this.x.value+'px';
    this.feedback_div.style.top = this.y.value+'px';
    this.feedback_div.style.width = this.width.value+'px';
    this.feedback_div.style.height = this.height.value+'px';
}

Tagger.prototype.mouseUp = function(event) {
    this.isMouseDown = false;
    document.body.onmousemove = this.oldMoveHandler;
    document.body.onmouseup = this.oldUpHandler;
}