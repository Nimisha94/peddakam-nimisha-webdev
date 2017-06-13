var widgetSchema=require('./widget.schema.server');
var mongoose=require('mongoose');
var widgetModel=mongoose.model('WidgetModel', widgetSchema);
var pageModel=require('../page/page.model.server');

widgetModel.createWidget=createWidget;
widgetModel.findAllWidgetsForPage=findAllWidgetsForPage;
widgetModel.findWidgetById=findWidgetById;
widgetModel.updateWidget=updateWidget;
widgetModel.deleteWidget=deleteWidget;
widgetModel.reorderWidget=reorderWidget;
//widgetModel.deleteWidgets=deleteWidgets;

module.exports=widgetModel;

function createWidget(pageId, widget) {
    widget._page = pageId;
    return widgetModel.find({_page:pageId})
        .then(function(widgets){
            widget.order=widgets.length;
            return widgetModel
                .create(widget)
                .then(function (widget) {
                    pageModel
                        .addWidget(pageId, widget._id)
                    return widget;
                });
    });
}

function findAllWidgetsForPage(pageId) {
    return widgetModel.find({_page:pageId})
        .sort({order:1})
        .populate('_page')
        .exec();
}

function findWidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
    delete widget._page;
    delete widget.dateCreated;
    return widgetModel.update({_id:widgetId},{$set:widget});

}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (widget) {
            return pageModel
                .deleteWidget(pageId, widgetId);
        });
}

/*function deleteWidgets(widgets) {
    for(var w in widgets)
    {
        widgetModel.remove({_id:widgets[w]});
    }
    return;
}*/

function reorderWidget(pageId, startInd, endInd) {
    return widgetModel.find({_page:pageId}, function (err, widgets) {
        widgets.forEach(function (widget)
        {
            if(startInd<endInd)
            {
                if(widget.order===startInd)
                {
                    widget.order=endInd;
                    widget.save();
                }
                else if(widget.order>startInd && widget.order<=endInd)
                {
                    widget.order=widget.order-1;
                    widget.save();
                }
            }
            else
            {
                if(widget.order===startInd)
                {
                    widget.order=endInd;
                    widget.save();
                }
                else if(widget.order<startInd && widget.order>=endInd)
                {
                    widget.order=widget.order+1;
                    widget.save();
                }
            }
        });
    });
}