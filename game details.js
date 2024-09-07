var gov=document.getElementById("gover")
var oro=document.getElementById("orow")

var pde=document.getElementById("pdet")
var dro=document.getElementById("drow")

var sre=document.getElementById("sreq")
var fsro=document.getElementById("srow")

gov.addEventListener("click",()=>{
    oro.style.display="block"
    dro.style.display="none"
    fsro.style.display="none"
    oro.style.display="flex"
    oro.style.alignItems="center"
    oro.style.justifyContent="center"
    
    
    gov.style.border="2px solid white"
    pde.style.border="none"
    sre.style.border="none"
})

pde.addEventListener("click",()=>{
    oro.style.display="none"
    dro.style.display="block"
    fsro.style.display="none"
    dro.style.display="flex"
    dro.style.alignItems="center"
    dro.style.justifyContent="center"

    
    pde.style.border="2px solid white"
    gov.style.border="none"
    sre.style.border="none"

})

sre.addEventListener("click",()=>{
    oro.style.display="none"
    dro.style.display="none"
    fsro.style.display="block"
    fsro.style.display="flex"
    fsro.style.alignItems="center"
    fsro.style.justifyContent="center"


    gov.style.border="none"
    pde.style.border="none"
    sre.style.border="2px solid white"

})
