# Profiq Lunch application
Simple application showing Lunch offers at our Ostrava branch office.
Application using Node.js, Express, React and Ext JS-reactor for rendering Ext JS Components.

## Requirements

* Ext JS 6.2+

* Sencha Cmd 6.2+ ( In case of issues use Cmd 6.5 )

## Quick Start

If you haven't already, download Ext JS 6.2+ and Sencha Cmd 6.2+.

- Then, run the following to clone and install dependencies for the project:
  
        git clone https://github.com/alexanderDracka/ReactExampleExtjs.git
        cd ReactExampleExtjs
        npm install
    
    
- Copy your Ext JS SDK into ReactExampleExtjs/ext
- Edit paths in `webpack.config.js` and `webpack.config.prod.js`
- For dev build with app watch run:

        npm run dev

- For production build run:

        npm run prod
    
    
- The app is expecting the json data files:

        public/data/basta.json
        public/data/jaorsi.json