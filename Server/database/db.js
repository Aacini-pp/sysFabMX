import  {Sequelize} from 'sequelize'
const db =  new Sequelize("sysFAB","usersysfab","Ao^KdxZiq5Pik&m4Ñ",{
    host: 'localhost',
    port: '8696',
    dialect:"mysql",
    logging: false

});

export default db;


