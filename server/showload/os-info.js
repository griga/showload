var exec = require('child_process').exec;
function execute(command, callback){
    exec(command, function(error, stdout, stderr){ callback(stdout); });
};


module.exports.lscpu = function(callback){		
	execute("lscpu", function(content){
		callback(content.split('\n').reduce(function(out, next){
			var parts = next.split(':')
			if(parts[0]){
				out.push({
					key: parts[0].trim(),
					value: parts[1] ? parts[1].trim() : ''
				})
			}
			return out
		}, []));
	});
};