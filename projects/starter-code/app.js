
const openMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('nav ul');
const line = document.querySelectorAll('.line');
const links = document.querySelectorAll('nav ul li');

openMenu.addEventListener('click',function(){
    menu.classList.toggle('active');
    line.forEach(item=>{
        item.classList.toggle('active');
    })
    if(document.documentElement.classList.contains('active')){
        document.documentElement.classList.remove('active');
    }else{
        document.documentElement.classList.add('active');
    }
    
})

window.addEventListener('resize',function(e){
    if(this.window.innerWidth > 500){
        menu.classList.remove('active');
        line.forEach(item=>{
            item.classList.remove('active');
        })
        document.documentElement.classList.remove('active');
    }
})