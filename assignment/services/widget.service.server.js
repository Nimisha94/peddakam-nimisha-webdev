var app=require('../../express');
var widgetModel=require('../model/widget/widget.model.server');

var widgets=
    [
        { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/assignment/uploads' });

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/page/:pageId/widget/:widgetId', deleteWidget);
app.post ("/api/upload", upload.single('myFile'), uploadImage);
app.put('/api/page/:pageId/widget', reorderWidget);

function createWidget(req, res) {
    var pageId=req.params.pageId;
    var widget=req.body;
    /*widget._id=(new Date().getTime())+"";
    widget.pageId=pageId;
    widgets.push(widget);
    res.json(widget);*/
    widgetModel.createWidget(pageId,widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.sendStatus(404);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId=req.params.pageId;
   /* var wdgts=[];
    for(var w in widgets)
    {
        if(widgets[w].pageId === pageId)
        {
            wdgts.push(widgets[w]);
        }
    }
    res.json(wdgts);*/
   widgetModel.findAllWidgetsForPage(pageId)
       .then(function (widgets) {
           res.json(widgets);
       }, function (err) {
           res.sendStatus(404);
       });
}

function findWidgetById(req, res) {
    var widgetId=req.params.widgetId;
    /*for(var w in widgets)
    {
        if(widgets[w]._id === widgetId)
        {
            res.json(widgets[w]);
            return;
        }
    }
    res.json(null);*/
    widgetModel.findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            console.log(err);
            res.json(null);
        });
}

function updateWidget(req, res) {
    var widgetId=req.params.widgetId;
    var widget=req.body;
    /*for(var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            widgets[w]=widget;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);*/
    widgetModel.updateWidget(widgetId,widget)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(404);
        });
}

function deleteWidget(req, res) {
    var widgetId=req.params.widgetId;
    var pageId=req.params.pageId;
    /*var index=null;
    for(var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            index=w;
            break;
        }
    }
    if(index)
    {
        widgets.splice(index, 1);
        res.sendStatus(200);
        return;
    }
    else
        res.sendStatus(404);*/
    widgetModel.deleteWidget(pageId,widgetId)
        .then(function () {
            res.sendStatus(200);
        }, function () {
            res.sendStatus(404);
        });
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;

    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    //widget = getWidgetById(widgetId);
    var widget=null;
    /*for(var w in widgets)
    {
        if (widgets[w]._id === widgetId)
        {
            widget=widgets[w];
            break;
        }
    }*/
    widget=widgetModel.findWidgetById(widgetId);

    //widget.url = '/assignment/uploads/'+filename;

    var w={
        url:'/assignment/uploads/'+filename
    };

    widgetModel.updateWidget(widgetId,w)
        .then(function (status) {
            var callbackUrl   = "/assignment/#!/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

            res.redirect(callbackUrl);
        });


}

function reorderWidget(req, res) {
    var start = req.query.initial;
    var stop = req.query.final;
    var pageId=req.params.pageId;
    var wdgs=[];
    var wid=widgets;
    var cnt1=0;
    var cnt2=0;
    var cnt=0;
    var fin=[];
    for(var w in widgets)
    {
        if(widgets[w].pageId === pageId)
        {
            wdgs.push(widgets[w]);
        }
    }
    var widget=wdgs[start];
    wdgs.splice(start,1);
    w1=wdgs.slice(0,stop);
    w2=wdgs.slice(stop,wdgs.length);
    w1.push(widget);
    w1=w1.concat(w2);
    // widgets=w1;
    while(cnt2<wid.length)
    {
        if(wid[cnt2] === w1[cnt1])
        {
            fin[cnt++]=wid[cnt2];
            cnt1++;
            cnt2++;
        }
        else if(w1.indexOf(wid[cnt2]) === -1)
        {
            fin[cnt++]=wid[cnt2++];
        }
        else if(w1.indexOf(wid[cnt2]) >= 0)
        {
            fin[cnt++]=w1[cnt1++];
            cnt2++;
        }
    }
    widgets=fin;
    res.json(widgets);
}

function reorderWidget(req,res){
    var pageId = req.params.pageId;
    var startInd = parseInt(req.query.initial);
    var endInd = parseInt(req.query.final);
    widgetModel
        .reorderWidget(pageId, startInd, endInd)
        .then(function (widget) {
            res.json(widget);
        }, function (error) {
            res.sendStatus(500).send(error);
        });
}
