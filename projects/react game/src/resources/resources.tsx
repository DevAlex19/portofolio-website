export const data = [{url:"./images/icon-scissors.svg",class:'',content:'scissors',color:'linear-gradient(120deg, hsl(39, 89%, 49%), hsl(40, 84%, 53%))',shadow:'hsl(39, 100%, 35%)',value:'scissors'},
                  {url:"./images/icon-paper.svg",class:'',content:'paper',color:'linear-gradient(120deg, hsl(230, 89%, 62%), hsl(230, 89%, 65%))',shadow:'hsl(230, 89%, 57%)',value:'paper'},
                  {url:"./images/icon-rock.svg",class:'',content:'rock',color:'linear-gradient(120deg, hsl(349, 71%, 52%), hsl(349, 70%, 56%))',shadow:'hsl(349, 60%, 36%)',value:'rock'},
                  {url:"./images/icon-lizard.svg",class:'',content:'lizard',color:'linear-gradient(120deg, hsl(261, 73%, 60%), hsl(261, 72%, 63%))',shadow:'hsl(261, 72%, 50%)',value:'lizard'},
                  {url:"./images/icon-spock.svg",class:'',content:'spock',color:'linear-gradient(120deg, hsl(189, 59%, 53%), hsl(189, 58%, 57%))',shadow:'hsl(189, 58%, 35%)',value:'spock'}];


export function setWinner(choice:any){
  const {user,computer} = choice;
                    if(user === 'scissors'){
                        if(computer === 'scissors'){
                            return 'draw';
                        }else if(computer === 'paper' || computer === 'lizard'){
                            return 'winner';
                        }else{
                            return 'lose';
                        }
                    }
                    if(user === 'paper'){
                        if(computer === 'paper'){
                            return 'draw';
                        }else if(computer === 'rock' || computer === 'spock'){
                            return 'winner';
                        }else{
                            return 'lose';
                        }
                    }
                    if(user === 'rock'){
                        if(computer === 'rock'){
                            return 'draw';
                        }else if(computer === 'lizard' || computer === 'scissors'){
                            return 'winner';
                        }else{
                            return 'lose';
                        }
                    }
                    if(user === 'lizard'){
                        if(computer === 'lizard'){
                            return 'draw';
                        }else if(computer === 'spock' || computer === 'paper'){
                            return 'winner';
                        }else{
                            return 'lose';
                        }
                    }
                    if(user === 'spock'){
                        if(computer === 'spock'){
                            return 'draw';
                        }else if(computer === 'scissors' || computer === 'rock'){
                            return 'winner';
                        }else{
                            return 'lose';
                        }
                    }
                }