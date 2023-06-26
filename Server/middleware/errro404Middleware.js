
export default  function(req, res, next) {
    res.status(404);
  
    // respond with html page
    /* if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    } */

    console.log("errro404Middleware", req.originalUrl); 
    //console.log(req.originalUrl);
    res.redirect('/?redirec='+encodeURI(req.originalUrl));
  
    // respond with json
   /*  if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    } */
  
    // default to plain-text. send()
     //  res.type('txt').send('Not found');
  }