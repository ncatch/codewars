/*
 * @Description: 
 * @Author: Walker
 * @Date: 2021-03-10 19:14:16
 * @LastEditTime: 2021-06-11 17:50:56
 * @LastEditors: Walker
 */
// https://www.codewars.com/kata/5571d9fc11526780a000011a/train/javascript

class Thing {
	constructor(name) {
		this.name = name;

		this.setProps = new Proxy(this, {
			get (target, key) {
				target[target.tmpAdd] = key;
			}
		});

		this.is_the = new Proxy(this, {
			get (target, key) {
				target.tmpAdd = key;
				return target.setProps;
			}
		});

		this.is_a = new Proxy(this, {
			get (target, key) {
				target['is_a_' + key] = true;
			}
		});

		this.is_not_a = new Proxy(this, {
			get (target, key) {
				target['is_a_' + key] = false;
			}
		});

		this.parent_of = new Proxy(this, {
			get (target, key) {
				target['is_a_' + key] = false;
			}
		});
	}

	// is_a
	// is_not_a
	// is_the
	// parent_of
	
	// has
	// can
	// 
}

var jane = new Thing('jane');
jane.is_a.person;
console.log(jane.is_a_person);

jane.is_the.parent_of.joe
console.log(jane.parent_of);