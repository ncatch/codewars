// 已解决
// https://www.codewars.com/kata/5451712ea8a825a74f000863/train/javascript

function SQLEngine(database) {
	this.database = database;

	// 比较运算符
	const operator = {
		'=': (a, b) => a == b,
		'>': (a, b) => a > b,
		'>=': (a, b) => a >= b,
		'<': (a, b) => a < b,
		'<=': (a, b) => a <= b,
		'<>': (a, b) => a != b,
	}

	const regs = {
		queryTable: /FROM ([a-z_]*)/i, // 查询表格
		joinTable: /JOIN ([a-z_]*)/ig, // 链接的表格
		fieldReg: /SELECT (.*) FROM/i, // 查询的字段
		whereReg: /WHERE (.*) ([=><]{1,2}) (.*)/i, // 查询条件
		onReg: /ON ([a-z._]*) = ([a-z._]*)/ig, // 链接条件
	}

	this.execute = function (query) {
		const tableReg = query.match(regs.queryTable);
		const tableName = tableReg[1];

		const tables = {
			[tableName]: this.convertTable(tableName),
		};

		const joinTables = query.match(regs.joinTable);
		const joinWhere = query.match(regs.onReg);

		if (joinTables) {
			joinTables.forEach((ele, index) => {
				let tmpName = ele.replace(/JOIN /i, '');

				tables[tmpName] = this.convertTable(tmpName);

				const tmpWhrer = joinWhere[index].replace(/ON /i, '');
				const tabs = tmpWhrer.split(' = ');
				const table1 = tabs[0].split('.')[0];

				let tableKey = table1 == tmpName ? 0 : 1;
				let oriTable = tableName;
				if (tables[tmpName].length > tables[tableName].length) {
					oriTable = tmpName;
					tmpName = tableName;
					tableKey = Math.abs(tableKey - 1);
				}

				tables[tableName] = tables[oriTable].map(row => {
					const other = tables[tmpName].find(item => item[tabs[tableKey]] == row[tabs[Math.abs(tableKey - 1)]]);
					return {
						...row,
						...other,
					}
				})
			});
		}

		const where = query.match(regs.whereReg);

		if (where) {
			const func = operator[where[2]];

			let val = where[3];
			if (val.startsWith('\'')) {
				val = val.substr(1, val.length - 2)
			}

			val = val.replace(/\'\'/g, '\'')

			tables[tableName] = tables[tableName].filter(ele => func(ele[where[1]], val))
		}

		let fields = query.match(regs.fieldReg);

		fields = fields[1].split(', ')

		return tables[tableName].map(ele => {
			const res = {};
			fields.forEach(field => {
				res[field] = ele[field];
			})
			return res;
		})
	}

	this.convertTable = function (name) {
		return database[name].map(ele => {
			let result = {};
			for (const key in ele) {
				result[name + '.' + key] = ele[key];
			}

			return result;
		})
	}
}

var movieDatabase = {
	movie: [{
			id: 1,
			name: 'Avatar',
			directorID: 1
		},
		{
			id: 2,
			name: 'Titanic',
			directorID: 1
		},
		{
			id: 3,
			name: 'Infamous',
			directorID: 2
		},
		{
			id: 4,
			name: 'Skyfall',
			directorID: 3
		},
		{
			id: 5,
			name: 'Aliens',
			directorID: 1
		}
	],
	actor: [{
			id: 1,
			name: 'Leonardo DiCaprio'
		},
		{
			id: 2,
			name: 'Sigourney Weaver'
		},
		{
			id: 3,
			name: 'Daniel Craig'
		},
	],
	director: [{
			id: 1,
			name: 'James Cameron'
		},
		{
			id: 2,
			name: 'Douglas McGrath'
		},
		{
			id: 3,
			name: 'Sam Mendes'
		}
	],
	actor_to_movie: [{
			movieID: 1,
			actorID: 2
		},
		{
			movieID: 2,
			actorID: 1
		},
		{
			movieID: 3,
			actorID: 2
		},
		{
			movieID: 3,
			actorID: 3
		},
		{
			movieID: 4,
			actorID: 3
		},
		{
			movieID: 5,
			actorID: 2
		},
	]
};

movieDatabase = {
	movie: [{
			id: 1,
			title: 'The A-Team',
			year: 2010,
			directorID: 1
		},
		{
			id: 2,
			title: 'Avatar',
			year: 2009,
			directorID: 2
		},
		{
			id: 3,
			title: 'Titanic',
			year: 1997,
			directorID: 2
		},
		{
			id: 4,
			title: 'The Avengers',
			year: 2012,
			directorID: 3
		},
		{
			id: 5,
			title: 'Iron Man 3',
			year: 2013,
			directorID: 4
		},
		{
			id: 6,
			title: 'Iron Man',
			year: 2008,
			directorID: 5
		},
		{
			id: 7,
			title: 'The Lord of the Rings: The Return of the King',
			year: 2003,
			directorID: 6
		},
		{
			id: 8,
			title: 'The Lord of the Rings: The Fellowship of the Ring',
			year: 2001,
			directorID: 6
		},
		{
			id: 9,
			title: 'The Lord of the Rings: The Two Towers',
			year: 2002,
			directorID: 6
		},
		{
			id: 10,
			title: 'Skyfall',
			year: 2012,
			directorID: 7
		},
		{
			id: 11,
			title: 'The Dark Knight Rises',
			year: 2012,
			directorID: 8
		},
		{
			id: 12,
			title: 'The Dark Knight',
			year: 2008,
			directorID: 8
		},
		{
			id: 13,
			title: 'Pirates of the Caribbean: Dead Man\'s Chest',
			year: 2006,
			directorID: 9
		},
		{
			id: 14,
			title: 'Toy Story 3',
			year: 2010,
			directorID: 10
		},
		{
			id: 15,
			title: 'E.T. the Extra-Terrestrial',
			year: 1982,
			directorID: 11
		},
		{
			id: 16,
			title: 'Toy Story',
			year: 1995,
			directorID: 12
		},
		{
			id: 17,
			title: 'Pirates of the Caribbean: On Stranger Tides',
			year: 2011,
			directorID: 13
		},
		{
			id: 18,
			title: 'Jurassic Park',
			year: 1993,
			directorID: 11
		}
	],
	director: [{
			id: 1,
			name: 'Joe Carnahan'
		},
		{
			id: 2,
			name: 'James Cameron'
		},
		{
			id: 3,
			name: 'Joss Whedon'
		},
		{
			id: 4,
			name: 'Shane Black'
		},
		{
			id: 5,
			name: 'Jon Favreau'
		},
		{
			id: 6,
			name: 'Peter Jackson'
		},
		{
			id: 7,
			name: 'Sam Mendes'
		},
		{
			id: 8,
			name: 'Christopher Nolan'
		},
		{
			id: 9,
			name: 'Gore Verbinski'
		},
		{
			id: 10,
			name: 'Lee Unkrich'
		},
		{
			id: 11,
			name: 'Steven Spielberg'
		},
		{
			id: 12,
			name: 'John Lasseter'
		},
		{
			id: 13,
			name: 'Rob Marshall'
		}
	],
	actor: [{
			id: 1,
			name: 'Liam Neeson'
		},
		{
			id: 2,
			name: 'Bradley Cooper'
		},
		{
			id: 3,
			name: 'Jessica Biel'
		},
		{
			id: 4,
			name: 'Quinton \'Rampage\' Jackson'
		},
		{
			id: 5,
			name: 'Sam Worthington'
		},
		{
			id: 6,
			name: 'Zoe Saldana'
		},
		{
			id: 7,
			name: 'Sigourney Weaver'
		},
		{
			id: 8,
			name: 'Stephen Lang'
		},
		{
			id: 9,
			name: 'Leonardo DiCaprio'
		},
		{
			id: 10,
			name: 'Kate Winslet'
		},
		{
			id: 11,
			name: 'Billy Zane'
		},
		{
			id: 12,
			name: 'Kathy Bates'
		},
		{
			id: 13,
			name: 'Robert Downey Jr.'
		},
		{
			id: 14,
			name: 'Chris Evans'
		},
		{
			id: 15,
			name: 'Mark Ruffalo'
		},
		{
			id: 16,
			name: 'Chris Hemsworth'
		},
		{
			id: 17,
			name: 'Gwyneth Paltrow'
		},
		{
			id: 18,
			name: 'Don Cheadle'
		},
		{
			id: 19,
			name: 'Guy Pearce'
		},
		{
			id: 20,
			name: 'Terrence Howard'
		},
		{
			id: 21,
			name: 'Jeff Bridges'
		},
		{
			id: 22,
			name: 'Noel Appleby'
		},
		{
			id: 23,
			name: 'Alexandra Astin'
		},
		{
			id: 24,
			name: 'Sean Astin'
		},
		{
			id: 25,
			name: 'David Aston'
		},
		{
			id: 26,
			name: 'Alan Howard'
		},
		{
			id: 27,
			name: 'Elijah Wood'
		},
		{
			id: 28,
			name: 'Bruce Allpress'
		},
		{
			id: 29,
			name: 'John Bach'
		},
		{
			id: 30,
			name: 'Sala Baker'
		},
		{
			id: 31,
			name: 'Daniel Craig'
		},
		{
			id: 32,
			name: 'Judi Dench'
		},
		{
			id: 33,
			name: 'Javier Bardem'
		},
		{
			id: 34,
			name: 'Ralph Fiennes'
		},
		{
			id: 35,
			name: 'Christian Bale'
		},
		{
			id: 36,
			name: 'Gary Oldman'
		},
		{
			id: 37,
			name: 'Tom Hardy'
		},
		{
			id: 38,
			name: 'Joseph Gordon-Levitt'
		},
		{
			id: 39,
			name: 'Heath Ledger'
		},
		{
			id: 40,
			name: 'Aaron Eckhart'
		},
		{
			id: 41,
			name: 'Michael Caine'
		},
		{
			id: 42,
			name: 'Johnny Depp'
		},
		{
			id: 43,
			name: 'Orlando Bloom'
		},
		{
			id: 44,
			name: 'Keira Knightley'
		},
		{
			id: 45,
			name: 'Jack Davenport'
		},
		{
			id: 46,
			name: 'Tom Hanks'
		},
		{
			id: 47,
			name: 'Tim Allen'
		},
		{
			id: 48,
			name: 'Joan Cusack'
		},
		{
			id: 49,
			name: 'Ned Beatty'
		},
		{
			id: 50,
			name: 'Dee Wallace'
		},
		{
			id: 51,
			name: 'Henry Thomas'
		},
		{
			id: 52,
			name: 'Peter Coyote'
		},
		{
			id: 53,
			name: 'Robert MacNaughton'
		},
		{
			id: 54,
			name: 'Don Rickles'
		},
		{
			id: 55,
			name: 'Jim Varney'
		},
		{
			id: 56,
			name: 'Penélope Cruz'
		},
		{
			id: 57,
			name: 'Geoffrey Rush'
		},
		{
			id: 58,
			name: 'Ian McShane'
		},
		{
			id: 59,
			name: 'Sam Neill'
		},
		{
			id: 60,
			name: 'Laura Dern'
		},
		{
			id: 61,
			name: 'Jeff Goldblum'
		},
		{
			id: 62,
			name: 'Richard Attenborough'
		}
	],
	actor_to_movie: [{
			actorID: 1,
			movieID: 1
		},
		{
			actorID: 2,
			movieID: 1
		},
		{
			actorID: 3,
			movieID: 1
		},
		{
			actorID: 4,
			movieID: 1
		},
		{
			actorID: 5,
			movieID: 2
		},
		{
			actorID: 6,
			movieID: 2
		},
		{
			actorID: 7,
			movieID: 2
		},
		{
			actorID: 8,
			movieID: 2
		},
		{
			actorID: 9,
			movieID: 3
		},
		{
			actorID: 10,
			movieID: 3
		},
		{
			actorID: 11,
			movieID: 3
		},
		{
			actorID: 12,
			movieID: 3
		},
		{
			actorID: 13,
			movieID: 4
		},
		{
			actorID: 13,
			movieID: 5
		},
		{
			actorID: 13,
			movieID: 6
		},
		{
			actorID: 14,
			movieID: 4
		},
		{
			actorID: 15,
			movieID: 4
		},
		{
			actorID: 16,
			movieID: 4
		},
		{
			actorID: 17,
			movieID: 5
		},
		{
			actorID: 17,
			movieID: 6
		},
		{
			actorID: 18,
			movieID: 5
		},
		{
			actorID: 19,
			movieID: 5
		},
		{
			actorID: 20,
			movieID: 6
		},
		{
			actorID: 21,
			movieID: 6
		},
		{
			actorID: 22,
			movieID: 7
		},
		{
			actorID: 22,
			movieID: 8
		},
		{
			actorID: 23,
			movieID: 7
		},
		{
			actorID: 24,
			movieID: 7
		},
		{
			actorID: 24,
			movieID: 8
		},
		{
			actorID: 24,
			movieID: 9
		},
		{
			actorID: 25,
			movieID: 7
		},
		{
			actorID: 26,
			movieID: 8
		},
		{
			actorID: 27,
			movieID: 8
		},
		{
			actorID: 28,
			movieID: 9
		},
		{
			actorID: 29,
			movieID: 9
		},
		{
			actorID: 30,
			movieID: 9
		},
		{
			actorID: 31,
			movieID: 10
		},
		{
			actorID: 32,
			movieID: 10
		},
		{
			actorID: 33,
			movieID: 10
		},
		{
			actorID: 34,
			movieID: 10
		},
		{
			actorID: 35,
			movieID: 11
		},
		{
			actorID: 35,
			movieID: 12
		},
		{
			actorID: 36,
			movieID: 11
		},
		{
			actorID: 37,
			movieID: 11
		},
		{
			actorID: 38,
			movieID: 11
		},
		{
			actorID: 39,
			movieID: 12
		},
		{
			actorID: 40,
			movieID: 12
		},
		{
			actorID: 41,
			movieID: 12
		},
		{
			actorID: 42,
			movieID: 13
		},
		{
			actorID: 42,
			movieID: 17
		},
		{
			actorID: 43,
			movieID: 13
		},
		{
			actorID: 44,
			movieID: 13
		},
		{
			actorID: 45,
			movieID: 13
		},
		{
			actorID: 46,
			movieID: 14
		},
		{
			actorID: 46,
			movieID: 16
		},
		{
			actorID: 47,
			movieID: 14
		},
		{
			actorID: 47,
			movieID: 16
		},
		{
			actorID: 48,
			movieID: 14
		},
		{
			actorID: 49,
			movieID: 14
		},
		{
			actorID: 50,
			movieID: 15
		},
		{
			actorID: 51,
			movieID: 15
		},
		{
			actorID: 52,
			movieID: 15
		},
		{
			actorID: 53,
			movieID: 15
		},
		{
			actorID: 54,
			movieID: 16
		},
		{
			actorID: 55,
			movieID: 16
		},
		{
			actorID: 56,
			movieID: 17
		},
		{
			actorID: 57,
			movieID: 17
		},
		{
			actorID: 58,
			movieID: 17
		},
		{
			actorID: 59,
			movieID: 18
		},
		{
			actorID: 60,
			movieID: 18
		},
		{
			actorID: 61,
			movieID: 18
		},
		{
			actorID: 62,
			movieID: 18
		}
	]
}

var engine = new SQLEngine(movieDatabase);

var actual = engine.execute("SELECT movie.title FROM movie WHERE movie.title = 'Pirates of the Caribbean: Dead Man''s Chest'");



// var actual = engine.execute('SELECT movie.name FROM movie');
// console.log(actual, [{
// 		'movie.name': 'Avatar'
// 	},
// 	{
// 		'movie.name': 'Titanic'
// 	},
// 	{
// 		'movie.name': 'Infamous'
// 	},
// 	{
// 		'movie.name': 'Skyfall'
// 	},
// 	{
// 		'movie.name': 'Aliens'
// 	}
// ]);
// var actual = engine.execute('SELECT movie.name FROM movie WHERE movie.directorID = 1');
// console.log(actual, [{
// 		'movie.name': 'Avatar'
// 	},
// 	{
// 		'movie.name': 'Titanic'
// 	},
// 	{
// 		'movie.name': 'Aliens'
// 	}
// ]);

// var actual = engine.execute('SELECT movie.name, director.name ' +
// 	'FROM movie ' +
// 	'JOIN director ON director.id = movie.directorID');
// console.log(actual, [{
// 		'movie.name': 'Avatar',
// 		'director.name': 'James Cameron'
// 	},
// 	{
// 		'movie.name': 'Titanic',
// 		'director.name': 'James Cameron'
// 	},
// 	{
// 		'movie.name': 'Aliens',
// 		'director.name': 'James Cameron'
// 	},
// 	{
// 		'movie.name': 'Infamous',
// 		'director.name': 'Douglas McGrath'
// 	},
// 	{
// 		'movie.name': 'Skyfall',
// 		'director.name': 'Sam Mendes'
// 	}
// ]);

// var actual = engine.execute('SELECT movie.name, director.name ' +
// 	'FROM director ' +
// 	'JOIN movie ON director.id = movie.directorID');
// console.log(actual, [{
// 		'movie.name': 'Avatar',
// 		'director.name': 'James Cameron'
// 	},
// 	{
// 		'movie.name': 'Titanic',
// 		'director.name': 'James Cameron'
// 	},
// 	{
// 		'movie.name': 'Infamous',
// 		'director.name': 'Douglas McGrath'
// 	},
// 	{
// 		'movie.name': 'Skyfall',
// 		'director.name': 'Sam Mendes'
// 	},
// 	{
// 		'movie.name': 'Aliens',
// 		'director.name': 'James Cameron'
// 	}
// ]);

// var actual = engine.execute('SELECT movie.name, actor.name ' +
// 	'FROM movie ' +
// 	'JOIN actor_to_movie ON actor_to_movie.movieID = movie.id ' +
// 	'JOIN actor ON actor_to_movie.actorID = actor.id ' +
// 	'WHERE actor.name <> \'Daniel Craig\'');
// console.log(actual, [{
// 		'movie.name': 'Aliens',
// 		'actor.name': 'Sigourney Weaver'
// 	},
// 	{
// 		'movie.name': 'Avatar',
// 		'actor.name': 'Sigourney Weaver'
// 	},
// 	{
// 		'movie.name': 'Infamous',
// 		'actor.name': 'Sigourney Weaver'
// 	},
// 	{
// 		'movie.name': 'Titanic',
// 		'actor.name': 'Leonardo DiCaprio'
// 	}
// ]);