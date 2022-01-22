const rp = require('request-promise')
const Cheerio = require('cheerio')

exports.getPengumuman = (req, res, next) => {
    const url = 'https://siamik.upnjatim.ac.id/html/siamik/umum.asp';
    let data = []

    rp(url)
    .then((e) => {
      // console.log(cheerio('#basic-examples', e))
      const cheerio = Cheerio.load(e)
      let x = cheerio('.media-body')
      x.find("div").each(function() {
        this.attribs.class = ''
      })
      x.find("br").each(function() {
        cheerio(this).remove()
      })
      x.find("img").each(function() {
        this.attribs.src = `https://siamik.upnjatim.ac.id/html/siamik/${this.attribs.src}`
      })
      // x.find("font > b").each(function() {
      //   d = this?.firstChild?.data.toString()
      //   this.children = []
      // })

      x.each((_i, el) => {
        let img = ''
        let title = ''
        let d = ''
        let links = []
        let b = el.children.map((e) => {
          // console.log(e)
          if(e.name == "a") links.push(`https://siamik.upnjatim.ac.id/html/siamik/${e.attribs.href}`)
          if(e.type == "tag" || e.type == "text" || e.name == "a") {
            let y = cheerio(e)
            y.find('font > b').each((_e, elem) => {
              let f = elem.firstChild?.data.toString().replace('Jam ', '').replace(' Wib', '')
              f = f.split(' ')
              // console.log(f)
              f[1] = f[1].split('').splice(0, 3).join("").replace("Agu", "Aug").replace("Okt", "Oct").replace("Peb", "Feb").replace("Nop", "Nov").replace("Des", "Dec").replace("Mei", "May")
              
              d = f.join(' ')
              // d.
              // d
            })
            // y.find('a').each((_e, elem) => {
            //   console.log(elem)
            // })
            if(e.type == "tag" && e.name == "h4") {
              // console.log(e.children[0])
              title = e.children[1].data
              img = e.children[0].attribs.src
            }
            return e.data
          }
          
        })

        data.push({
          date: d,
          title: title,
          body: b.join('').replaceAll("\t","").replaceAll("\n",""),
          icon: img,
          links: links
        })
        // console.log(el)
      })

      
      res.status(200).json({
          payload: data
      })
    })
    .catch(console.error)
}