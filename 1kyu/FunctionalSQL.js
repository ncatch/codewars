// https://www.codewars.com/kata/545434090294935e7d0010ab


function SQL() {
	this.selectFunc = null;
	this.data = null;
	this.whereFunc = null
	this.orderFunc = null;
	this.groupArg = null;
	this.havingFunc = null;

	this.select = function (func) {
		console.log('select')

		if (this.selectFunc) {
			return 'err select';
		}
		this.selectFunc = func;
		return this;
	}
	this.from = function (data) {
		console.log('from',data)
		if (this.data) {
			return 'err data';
		}

		this.data = data;
		return this;
	}
	this.where = function (func) {
		console.log('where')
		if (this.whereFunc) {
			return 'err where';
		}

		this.whereFunc = func;
		return this;
	}
	this.orderBy = function () {
		console.log('orderBy')
		if (this.orderFunc) {
			return 'err order';
		}

		this.orderFunc = func;
		return this;
	}
	this.groupBy = function (...arg) {
		console.log('groupBy', arg)
		if (this.groupArg) {
			return 'err group';
		}

		this.groupArg = arg;
		return this;
	}
	this.having = function () {
		console.log('having')
		if (this.havingFunc) {
			return 'err having';
		}

		this.havingFunc = arg;
		return this;
	}

	function groupHandler(arr, groupFunc) {
		const res = {};
		const tmpFunc = groupFunc.shift();

		arr.forEach(ele => {
			const key = tmpFunc(ele)

			if (!res[key]) res[key] = [];

			res[key].push(ele);
		})

		if (groupFunc.length) {
			for (const key in res) {
				res[key] = groupHandler(res[key], [...groupFunc])
			}
		}

		const tmp = [];
		
		for (const key in res) {
			tmp.push([isNaN(key) ? key : parseInt(key), res[key]])
		}

		return tmp;
	}

	this.execute = function () {
		let res = this.data || [];

		if (this.whereFunc) {
			res = res.filter(this.whereFunc);
		}

		if (this.groupArg) {
			res = groupHandler(res, this.groupArg)
		}

		if (this.selectFunc) {
			res = res.map(this.selectFunc);
		}

		return res;
	}
}

var query = function () {
	return new SQL();
}



var persons = [{
		name: 'Peter',
		profession: 'teacher',
		age: 20,
		maritalStatus: 'married'
	},
	{
		name: 'Michael',
		profession: 'teacher',
		age: 50,
		maritalStatus: 'single'
	},
	{
		name: 'Peter',
		profession: 'teacher',
		age: 20,
		maritalStatus: 'married'
	},
	{
		name: 'Anna',
		profession: 'scientific',
		age: 20,
		maritalStatus: 'married'
	},
	{
		name: 'Rose',
		profession: 'scientific',
		age: 50,
		maritalStatus: 'married'
	},
	{
		name: 'Anna',
		profession: 'scientific',
		age: 20,
		maritalStatus: 'single'
	},
	{
		name: 'Anna',
		profession: 'politician',
		age: 50,
		maritalStatus: 'married'
	}
];

function profession(person) {
	return person.profession;
}

function name(person) {
	return person.name;
}

function isTeacher(person) {
	return person.profession === 'teacher';
}

function age(person) {
	return person.age;
}

function maritalStatus(person) {
	return person.maritalStatus;
}

function professionCount(group) {
	return [group[0], group[1].length];
}

query().select(professionCount).from(persons).groupBy(profession).orderBy(naturalCompare).execute()
// query().select().from(persons).where(isTeacher).groupBy(profession).execute()