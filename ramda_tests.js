const _ = require('ramda');

const data = [
{_id: 1, Name:"Aaa Test test test"},
{_id: 2, Name:"bbb Test test test"},
{_id: 3, Name:"Cccc Test test test"},
{_id: 4, Name:"Ććććć Test test test"},
{_id: 5, Name:"Czzzz Test test test"},
{_id: 6, Name:"Zzzz Test test test"},
{_id: 7, Name:"Źźźź Test test test"},
{_id: 8, Name:"Żżżżż Test test test"},
{_id: 9, Name:"aaaaa Test test test"},
{_id: 10, Name:"Aaaaa Test test test"},
{_id: 11, Name:"abaaa Test test test"},
{_id: 12, Name:"Abaaa Test test test"},
{_id: 13, Name:"Żżżżż Test test test"}
];

const sort = 'ASC';
const filter = `test`;

const diff = _.curry((dir, a, b) => {
    let res = a.Name.localeCompare(b.Name, `pl`);
    res *= dir;
    return res;
});

const dir = sort!=='ASC'?-1:1;

const sortf = _.sort(diff(dir));

const contains = _.curry((filter, cust)=>{
	if(!cust || !cust.Name) return true;
    return cust.Name.toLowerCase().indexOf(filter) > -1;
});

const containsFilt = contains(filter?filter:``);

const filterf = _.filter(containsFilt);

const sortAndFilterData = _.compose(sortf, filterf);

console.log(sortAndFilterData(data));

