const data = [
        {
          "name": "Moon",
          "images": {
            "png": "./assets/destination/image-moon.png",
            "webp": "./assets/destination/image-moon.webp"
          },
          "description": "See our planet as you’ve never seen it before. A perfect relaxing trip away to help regain perspective and come back refreshed. While you’re there, take in some history by visiting the Luna 2 and Apollo 11 landing sites.",
          "distance": "384,400 km",
          "travel": "3 days"
        },
        {
          "name": "Mars",
          "images": {
            "png": "./assets/destination/image-mars.png",
            "webp": "./assets/destination/image-mars.webp"
          },
          "description": "Don’t forget to pack your hiking boots. You’ll need them to tackle Olympus Mons, the tallest planetary mountain in our solar system. It’s two and a half times the size of Everest!",
          "distance": "225 mil. km",
          "travel": "9 months"
        },
        {
          "name": "Europa",
          "images": {
            "png": "./assets/destination/image-europa.png",
            "webp": "./assets/destination/image-europa.webp"
          },
          "description": "The smallest of the four Galilean moons orbiting Jupiter, Europa is a winter lover’s dream. With an icy surface, it’s perfect for a bit of ice skating, curling, hockey, or simple relaxation in your snug wintery cabin.",
          "distance": "628 mil. km",
          "travel": "3 years"
        },
        {
          "name": "Titan",
          "images": {
            "png": "./assets/destination/image-titan.png",
            "webp": "./assets/destination/image-titan.webp"
          },
          "description": "The only moon known to have a dense atmosphere other than Earth, Titan is a home away from home (just a few hundred degrees colder!). As a bonus, you get striking views of the Rings of Saturn.",
          "distance": "1.6 bil. km",
          "travel": "7 years"
        }
      ];
      const planetTitle = document.querySelector('.planets h1');
      const avgDistance = document.querySelector('.distance p');
      const travelTime = document.querySelector('.travel p');
      const planetDescription = document.querySelector('.planets > p');
      const planetImage = document.querySelector('.destination-container > img');
      const destinationLinks = document.querySelectorAll('.planets-menu a');


      window.addEventListener('load',function(){
        const {name,distance,description,travel,images:{png}} = data[0];
        planetTitle.textContent = name;
        avgDistance.textContent = distance;
        planetDescription.textContent = description;
        travelTime.textContent = travel;
        planetImage.src = png;
    })

    destinationLinks.forEach(link =>{
        link.addEventListener('click',function(){
            destinationLinks.forEach(link =>{
                link.classList.remove('selected');
            })
            link.classList.add('selected'); 
            data.forEach(item =>{
                if(link.textContent.toLowerCase() === item.name.toLowerCase()){
                    const {name,distance,description,travel,images:{png}} = item;
                    planetTitle.textContent = name;
                    avgDistance.textContent = distance;
                    planetDescription.textContent = description;
                    travelTime.textContent = travel;
                    planetImage.src = png;
                }
            })
            
        })
    })