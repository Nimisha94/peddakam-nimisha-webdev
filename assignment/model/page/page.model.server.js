var pageSchema=require('./page.schema.server');
var mongoose=require('mongoose');
var pageModel=mongoose.model('PageModel', pageSchema);
var websiteModel=require('../website/website.model.server');
//var widgetModel=require('../widget/widget.model.server');

pageModel.createPage=createPage;
pageModel.findAllPagesForWebsite=findAllPagesForWebsite;
pageModel.findPageById=findPageById;
pageModel.updatePage=updatePage;
pageModel.deletePage=deletePage;
pageModel.addWidget=addWidget;
pageModel.deleteWidget=deleteWidget;
//pageModel.deletePages=deletePages;

module.exports=pageModel;

function deleteWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        });
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            page.save();
        });
}

function createPage(websiteId, page) {
    page._website = websiteId;
    return pageModel
        .create(page)
        .then(function (page) {
            return websiteModel
                .addPage(websiteId, page._id)
        });
}

function findAllPagesForWebsite(websiteId) {
    return pageModel.find({_website:websiteId})
        .populate('_website')
        .exec();
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
    delete page._website;
    delete page.dateCreated;
    return pageModel.update({_id:pageId},{$set:page});
}

function deletePage(websiteId,pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (page) {
            return websiteModel
                .deletePage(websiteId, pageId);
                /*.then(function (page) {
                    return widgetModel.deleteWidgets(page.widgets);
                });*/
        });
}

/*
function deletePages(pageIds) {
    for(var p in pageIds)
    {
        pageModel.remove({_id: pageIds[p]})
            .then(function (page) {
                widgetModel.deleteWidgets(page.widgets);
            });

    }
    return;
}*/
