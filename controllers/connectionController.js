const model = require('../models/connection');

exports.index = (req, res, next) => {
    model.find()
    .then(connections=>res.render('./connection/connections', {connections}))
    .catch(err=>next(err));
};

exports.new = (req, res) => {
    res.render('./connection/newConnections');
};

exports.create = (req, res, next) => {
    let connection = new model(req.body);//create a new connection document
    connection.author = req.session.user;
    connection.save()//insert the document to the database
    .then(connection => {
        req.flash('success', 'Connection has been created successfully');
        res.redirect('/connections')
    })
    .catch(err=>{
        if(err.name === 'ValidationError' ) {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    model.findById(id).populate('author', 'firstName lastName')
    .then(connection => {
        if(connection) {
            return res.render('./connection/connection', {connection});
        } else {
            let err = new Error('Cannot find a connection with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(connection => {
        return res.render('./connection/edit', {connection});
    })
    .catch(err=>next(err));
};

exports.update = (req, res, next) => {
    let connection = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, connection, {useFindAndModify: false, runValidators: true})
    .then(connection => {
        res.redirect('/connections/'+id);
    })
    .catch(err=> {
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            return res.redirect('/back');
        }
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(connection =>{
        res.redirect('/connections');
    })
    .catch(err=>next(err));
};