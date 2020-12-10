WebSquare.uiplugin.multiupload.prototype.initialize = function(/*optional*/element){
    try {
        this.type = this.options.type;
        this.style = this.options.style;
        this.className = this.options.className;
        if(!this.options.action) {
            this.action = WebSquare.baseServletURI + "upload.wq?callbackFunction="+this.id+".callback";
        } else {
            this.action = this.options.action;
        }
        this.size=  this.options.maxsize;
        this.count = this.options.maxcount;
        this.lang = this.options.lang||WebSquare.BootLoader.getBrowserLanguage();
        this.debugmode = this.options.debugmode;
        if(!this.options.css) {
            this.css = WebSquare.baseURI+"uiplugin/multiupload/mystyle.css";
        } else {
            this.css = this.options.css;
        }
        this.xmlEvents = this.options.xmlEvents;
        this.disabled = this.options.disabled;
        this.filter =this.options.filter + "|모든 파일:*.*";
        this.uploadButton = this.options.uploadButton;
        this.selectWithUpload = this.options.selectWithUpload;
        this.mode = this.options.mode;
        if(this.mode == "transparent" || this.mode == "html5_transparent"){
            this.options.wmode=true;
        }
        this.subDir = this.options.subDir;
        this.selectCallback = this.options.selectCallback;
        this.sessionId = "";    //multiupload.swf에서 브라우저 sessionId값을 사용하는 용도임.

        //html5 uploader
        this.html5Upload = false;
        if( typeof FormData == "undefined" ) {
            this.html5Upload = false;
        } else if( this.options.mode == "flash" || this.options.mode == "transparent" )  {
            this.html5Upload = false;
        } else if( this.options.mode == "html5" || this.options.mode == "html5_transparent" ) {
            this.html5Upload = true;
        }
        this._inx=0;
        this.fileArray = [];
        this.selectedRows= [];
        this.removeRows = [];
        this.fileNameArr = [];
        this.xhrArr = [];
        this.uploadParam = [];
        this.uploadParamJSON = {};
        this.returnDataArr = [];
        this.isWork = false;
    } catch (e){
        WebSquare.exception.printStackTrace(e, null, this);
    }
};
WebSquare.uiplugin.multiupload.prototype.onDone = function(xml){
    ["WebSquare.uiplugin.multiupload.onDone"];
    try {
      var _this = this;
      var sendMode = this.options.mode.toLowerCase();
      if( this.html5Upload && sendMode == "html5" || sendMode == "html5_transparent" ) {
        this.uploadParam = [];
        this.uploadParamJSON = {};
        this.fileArray = [];
        this.fileNameArr = [];
        this.removeRows = [];
    }

    WebSquare.event.fireEvent(_this, "ondone", xml );
} catch (e) {
    WebSquare.exception.printStackTrace(e, null, this);
}
};
WebSquare.uiplugin.multiupload.prototype.setParamJSON = function (obj) {
    ["WebSquare.uiplugin.multiupload.setParamJSON"];
    var sendMode = this.options.mode.toLowerCase();
    if (this.html5Upload && sendMode == "html5" || sendMode == "html5_transparent") {
        this.uploadParamJSON = obj;
    }
};
WebSquare.uiplugin.multiupload.prototype.callback = function(data) {
    ["WebSquare.uiplugin.multiupload.callback"];
    try {
        if( this.html5Upload ) {
            this.fileArray = [];
            this.fileNameArr = [];
            this.removeRows = [];
            this.xhrArr = [];
            this.uploadParam = [];
            this.uploadParamJSON = {};
            this.returnDataArr = [];
            this.isWork = false;
        }

        WebSquare.event.fireEvent(this, "ondone", data);
    } catch(e) {
        WebSquare.exception.printStackTrace(e);
    }
};
WebSquare.uiplugin.multiupload.prototype._XHRUpload = function(xhr, file){

    try {
        var url = this.action;
        var _this = this;
        var id = this.id;

        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                var result = xhr.responseText;
                _this.callbackXHRHandle(result.substring(result.indexOf("<ret>"), result.indexOf("</ret>")+6));

                xhr.onreadystatechange = function() {};
                xhr = null;
            }
        };
        xhr.open("POST", url, true);

        xhr.addEventListener("load", function(e) {
            // console.log("load");
            // _this.fileNameArr = [];
        }, false);

        var fd = new FormData();
        fd.append("Filename", file.name);
        fd.append("FileData", file);
        if (this.options.subDir) {
            fd.append("subDir", this.options.subDir);
        }

        if (this.uploadParam.length > 0) {
            for (var i = 0; i < this.uploadParam.length; i++) {
                var obj = this.uploadParam[i];
                for (key in obj) {
                    fd.append(key, obj[key]);
                }
            }
        }
        if (this.uploadParamJSON[file.name]) {
            var obj = this.uploadParamJSON[file.name];
            for (var key in obj) {
                fd.append(key, obj[key]);
            }
        }

        xhr.upload.addEventListener("progress", function(e) {

            var progressData = Math.round(e.loaded / e.total * 100);
            var returnObj = {};
            returnObj.percentData = progressData;
            returnObj.fileName = file.name;
            WebSquare.event.fireEvent(_this, "onprogress", returnObj );

        }, false);

        this.isUploading = true;
        xhr.send(fd);

    } catch(e){
        WebSquare.exception.printStackTrace(e, null, this);
    }
}
WebSquare.uiplugin.multiupload.prototype._clearInput = function(){
    try{
        if( this.html5Upload && this.options.mode.toLowerCase() == "html5"){
        } else {
            if( this.dom.inputZone.value != ""){
                if( WebSquare.core.browserCheck.ieAllVersion ) {
                    var inputNode=document.getElementById(this.id +"_file_input");
                    var inputcln=inputNode.cloneNode(true);
                    var parentNode = inputNode.parentNode;
                    parentNode.insertBefore(inputcln,inputNode);
                    parentNode.removeChild(inputNode);
                    this.dom.inputZone = inputcln;
                    var _this = this;
                    this.dom.inputZone.onchange = function(){
                        var fileArr = this.files;
                        if( fileArr.length > _this.count ) {
                            alert( "업로드 건수가 " + _this.count + "건으로 제한되어 있습니다." );
                            this.fileArray = [];
                            this.fileNameArr = [];
                            this.removeRows = [];
                            this.xhrArr = [];
                            this.uploadParam = [];
                            this.returnDataArr = [];
                            this.isWork = false;
                            _this._clearInput();
                            return;
                        }
                        if(fileArr){
                            for(var i=0;i<fileArr.length;i++){
                                var fileExist = false;
                                for( var j=0;j<_this.fileNameArr.length;j++ ) {
                                    if( fileArr[i].name == _this.fileNameArr[j] ) {
                                        fileExist = true;
                                        break;
                                    }
                                }
                                if( fileExist == false ) {
                                    _this.fileArray.push(fileArr[i]);
                                    _this.fileNameArr.push(fileArr[i].name);
                                    _this._inx++;
                                } else {
                                    alert("파일이 이미 있습니다.  ("+fileArr[i].name+")");
                                }
                            }
                        }
                        _this._clearInput();
                        if( _this.selectCallback != "") {
                            window[_this.selectCallback]();
                        }
                    };
                } else {
                    this.dom.inputZone.value = "";
                }
            }
        }
    } catch(e){
        WebSquare.exception.printStackTrace(e, null, this);
    }
}
