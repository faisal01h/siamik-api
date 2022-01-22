const rp = require('request-promise')
const Cheerio = require('cheerio')

exports.getKelasRegulerStudents = (req, res, next) => {
	let { kelas, prodi, kode } = req.query;

  if(!kelas || !prodi || !kode) return res.status(400).json({param:req.query});

  const url = `https://siamik.upnjatim.ac.id/html/siamik/daftarMahasiswa.asp?kelas=${kelas}&progdi=${prodi}&kode=${kode}`

  rp(url)
    .then((e) => {
        const cheerio = Cheerio.load(e)
      let x = cheerio('tbody')
      let xa = []

      x.children('tr').first().remove()
      x.find('tr').each(function() {
          this.childNodes.forEach((e, i) => {
              if(e.name == 'td' && e.children && i>=2) {
                //   e.children.forEach((el : any) => {
                //       console.log(el)
                //   })
                e.next = null
                e.prev = null
                // console.log(e)
                if(i == 2) {
									xa.push({
                    npm: e.children[0].data,
										name: '',
										sks: '0',
										ukt: null,
                	})
								}
								if(i == 3 && xa[xa.length-1]) xa[xa.length-1].name = e.children[0].data
								if(i == 4 && xa[xa.length-1]) xa[xa.length-1].sks = e.children[0].data
								if(i == 5 && xa[xa.length-1]) xa[xa.length-1].ukt = e.children[0].next ? e.children[0].next.data : null
              }
          })
					
      })
			res.status(200).json({
				payload: xa
			})

			
    })
}

exports.getContentOfKelasReguler = (req, res, next) => {
    let { id } = req.query;

    if(!id) return res.status(400).json({param:req.query});

    const url = `https://siamik.upnjatim.ac.id/html/siamik/daftarMtKuliah.asp?progdi=${id}`

    rp(url)
    .then((e) => {
        const cheerio = Cheerio.load(e)
      let x = cheerio('tbody')
      let xa = []

      x.children('tr').first().remove()
      x.find('tr').each(function() {
          this.childNodes.forEach((e, i) => {
              if(e.name == 'td' && e.children && i>=2) {
                //   e.children.forEach((el : any) => {
                //       console.log(el)
                //   })
                e.next = null
                e.prev = null
                // console.log(e)
                if(i == 2) {
									let param = e.children[0].attribs.href.split("?")[1].split("&")
									xa.push({
										link: e.children[0].attribs.href,
                    parameters: {
											kelas: param[0].split("=")[1],
											prodi: param[1].split("=")[1],
											kode: param[2].split("=")[1]
										},
                    code: e.children[0].children[0].data,
										name: 'undefined',
										sks: '0',
										kelas: '-',
										jumlah: '-1'
                	})
								}
								if(i == 3) xa[xa.length-1].name = e.children[0].data
								if(i == 4) xa[xa.length-1].sks = e.children[0].data
								if(i == 5) xa[xa.length-1].kelas = e.children[0].data
								if(i == 6) xa[xa.length-1].jumlah = e.children[0].data
              }
          })
					
      })
			res.status(200).json({
				payload: xa
			})

			
    })
}

exports.getListKelasReguler = (req, res, next) => {
    const url = 'https://siamik.upnjatim.ac.id/html/siamik/daftarPesertaKuliah.asp';
    let data = []

    rp(url)
    .then((e) => {
      // console.log(cheerio('#basic-examples', e))
      const cheerio = Cheerio.load(e)
      let x = cheerio('tbody')
      let xa = []

      x.children('tr').first().remove()
      x.find('tr').each(function() {
          this.childNodes.forEach((e, i) => {
              if(e.name == 'td' && e.children && i==2) {
                //   e.children.forEach((el : any) => {
                //       console.log(el)
                //   })
                e.next = null
                e.prev = null
                // console.log(e.children[0])
                xa.push({
                    link: `https://siamik.upnjatim.ac.id/html/siamik/${e.children[0].attribs.href}`,
										code: `${e.children[0].attribs.href.split("?")[1].split("=")[1]}`,
                    abbrev: e.children[0].children[0].data
                })
              }
          })
      })

      

      data = xa
      
      res.status(200).json({
        payload: data
      })
    })

      
    
    
}