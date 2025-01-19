//Shiffman - https://p5js.org/reference/#/p5/noise

function setup() {
  //angegebene feste größe und festlegen von noiseDetail()
  width = 400
  height = 400
  createCanvas(width, height)
  pixelDensity(1)
  noiseDetail(4, 0.5)

  //vier verschachtelte for Schleifen mit verschiedenen Offsets für die RGBA
  //da noise() mit den Offsets das gleiche ausgibt, wurden eine Trennung vorgenommen und übereinander gelegt. Evtl hätte man random() besser ausnutzen können oder gleich mehrere Offsets gleichzeitig nutzen und mit blendMode kombinieren können.
  noisey = 0.01
  for(let y = 0; y < height; y++){
    let noisex = 0.01
    for(let x = 0; x < width; x++){
      let noiseval = noise(noisex,noisey)
      stroke(noiseval*255, noiseval*255, 255, 255)
      point(x,y)
      noisex += 0.01
    }
    noisey += 0.01
  }

  noisey = 0.02
  for(let y = 0; y < height; y++){
    let noisex = 0.01
    for(let x = 0; x < width; x++){
      let noiseval = noise(noisex,noisey)
      stroke(255, noiseval*255, noiseval*255, 125) //die Alphas geringer machen, da sonst einfach grau
      point(x,y)
      noisex += 0.02
    }
    noisey += 0.02
  }
  
  noisey = 0.01
  for(let y = 0; y < height; y++){
    let noisex = 0.02
    for(let x = 0; x < width; x++){
      let noiseval = noise(noisex,noisey)
      stroke(noiseval*255, 255, noiseval*255, 70)
      point(x,y)
      noisex += 0.02
    }
    noisey += 0.03
  }
    
  for(let y = 0; y < height; y++){
    for(let x = 0; x < width; x++){
      let noiseval = noise(random(),random()) //hierdruch soll ein Zusatzfaktor hinzukommen
      stroke(0, 0, noiseval*255, noiseval*25)
      point(x,y)
    }
  }
}
