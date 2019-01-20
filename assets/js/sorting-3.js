//Chart.js configuration
Chart.defaults.global.tooltips.titleFontFamily = 'Montserrat'
Chart.defaults.global.tooltips.bodyFontFamily = 'Montserrat'
Chart.defaults.global.title.fontFamily = 'Montserrat'
Chart.defaults.global.title.fontSize = 18

// Transpose matrix function
const transpose = a => a[0].map((_, c) => a.map(r => r[c]))
const processData = text => {
	const textLines = text.split(/\r\n|\n/);
	const headers = textLines[0].split(',');
	const lines = [];

	for (let line of textLines) {
		if (line == textLines[0]) continue;
		const data = line.split(',');
		if (data.length == headers.length) {

			const tarr = [];
			for (let val of data) tarr.push(val);
			lines.push(tarr);
		}
	}
	return {
		headers: headers,
		lines: lines
	}
}

$(document)
	.ready(() => {
		$.ajax({
			type: "GET",
			url: "/~rbaudibert/blog/assets/csv/hash.csv",
			dataType: "text",
			success: data => {
				const {
					headers,
					lines
				} = processData(data);
				const info = transpose(lines);
				const tableSizes = info[0].filter((v, i, a) => a.indexOf(v) === i);
				const methods = info[1].filter((v, i, a) => a.indexOf(v) === i);
				const values = info[2];

				var barChartData = {
					labels: tableSizes,
					datasets: [{
						label: methods[0],
						backgroundColor: 'rgb(200, 140, 200)',
						stack: 'Stack 0',
						data: [
							values[0], values[3], values[6]
						]
					}, {
						label: methods[1],
						stack: 'Stack 1',
						backgroundColor: 'rgb(200, 200, 20)',
						data: [
							values[1], values[4], values[7]
						]
					}, {
						label: methods[2],
						stack: 'Stack 2',
						backgroundColor: 'rgb(140, 200, 20)',
						data: [
							values[2], values[5], values[8]
						]
					}, {
						label: methods[3],
						stack: 'Stack 0',
						backgroundColor: 'rgb(230, 170, 230)',
						data: [
							values[9], values[12], values[15]
						]
					}, {
						label: methods[4],
						stack: 'Stack 1',
						backgroundColor: 'rgb(255, 255, 70)',
						data: [
							values[10], values[13], values[16]
						]
					}, {
						label: methods[5],
						stack: 'Stack 2',
						backgroundColor: 'rgb(200, 255, 80)',
						data: [
							values[11], values[14], values[17]
						]
					}]

				};

				var ctx = document.getElementById('hash-1')
					.getContext('2d');
				window.myBar = new Chart(ctx, {
					type: 'bar',
					data: barChartData,
					options: {
						title: {
							display: true,
							text: 'Hashing Algorithms'
						},
						tooltips: {
							mode: 'index',
							intersect: false
						},
						responsive: true,
						scales: {
							xAxes: [{
								stacked: true,
							}],
							yAxes: [{
								stacked: true
							}]
						}
					}
				});
			}
		});

	});


/* ============================
   * TABLE CODE
   */

let hashTable;

function newHash() {
  hashTable = new HashTable(1009, 'openDoubleHashing');
  return hashTable;
}

function setInfo(key, data) {
  if (!hashTable) createHash();
  let {
    conflicts,
    exist
  } = hashTable.insert(key, data);
  return {
    key,
    data,
    conflicts,
    exist
  }
}

const getInfo = key => hashTable.search(key);

$('#insertButton').click(e => {
  e.preventDefault();
  $('#information').hide();
  const keys = $('#key')[0].value.split('\n').filter(x => x != '');
  const datas = $('#data')[0].value.split('\n').filter(x => x != '');
  if (keys[0] && datas[0] && keys.length == datas.length) {
    for (let key in keys) {
      const table = $('#playgroundTable');
      const {
        data,
        conflicts,
        exist
      } = setInfo(keys[key], datas[key]);
      table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($(
        '<td></td>').append('Insertion')).append($('<td></td>').append(keys[key])).append($('<td></td>')
        .append(
          data)).append($(
        '<td></td>').append(exist ? 'Key already exists' : conflicts)));
      $('#key')[0].value = '';
      $('#data')[0].value = '';
    }
  } else {
    const table = $('#playgroundTable');
    table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($('<td></td>').append(
      'BAD REQUEST -> FILL THE VALUES')));
  }
})

$('#retrieveButton').click(e => {
  e.preventDefault();
  $('#information').hide();
  const keys = $('#key')[0].value.split('\n');
  if (keys[0]) {
    for (let key of keys) {
      const {
        found,
        elem,
        conflicts
      } = getInfo(key);
      const table = $('#playgroundTable');
      table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($(
        '<td></td>').append('Search')).append($('<td></td>').append(key)).append($('<td></td>')
        .append(
          found ? elem.data : 'Not found')).append($(
        '<td></td>').append(conflicts)));
      $('#key')[0].value = '';
      $('#data')[0].value = '';
    }
  } else {
    const table = $('#playgroundTable');
    table.append($('<tr></tr>').append($('<td></td>').append(table[0].children.length)).append($('<td></td>').append(
      'BAD REQUEST -> FILL THE VALUES')));
  }
})

$('#resetButton').click(e => {
  e.preventDefault();
  newHash();
  console.log('Hash nova');
  $('#clearTable').click();
})

$('#clearTable').click(e => {
  const table = $('#playgroundTable');
  const length = table[0].children.length
  $('#information').show(0);
  for (let i = 1; i < length; i++)
    table[0].deleteRow(1);
})

$('#resetButton').click();