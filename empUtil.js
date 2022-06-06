// -----------tools-----------
const loadedScripts = {};

function loadScript(url) {
	return new Promise((resolve, reject) => {
		if (loadedScripts[url]) {
			return resolve(loadedScripts[url]);
		}

		const script = document.createElement('script');
		script.src = url;

		script.onload = function (e) {
			loadedScripts[url] = e;
			resolve(e);
		}

		script.onerror = function (e) {
			reject(e);
		}

		document.body.append(script);
	});
}

// -----------loader-----------
function EmpLoader (url, name) {
	this.url = url;
	this.name = name;
}

EmpLoader.prototype.load = async function (component) {
	await loadScript(this.url)
	const res = await global[this.name].get(component);

	return res();
}

// -----------util-------------
const EmpUtil = {};

EmpUtil.register = function (url, name) {
	this[name] = new EmpLoader(url, name);
}

export default EmpUtil;