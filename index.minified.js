class e{constructor(){const e=localStorage.getItem('new-year-2022-quest');this.t=e?JSON.parse(e):[{i:0,text:'я - твоё первое заданье<br>над моей сложностью не ржи<br>все цифры в наших днях рожденья<br>сложи',hint:'2904199119021990',o:['66'],l:'1',h:false,startTime:'2022-12-31T11:00:00.000Z',endTime:'2022-12-31T13:00:00.000Z'},{i:1,text:'я в твоём царстве в месте тайном<br>успешно разместил пароль<br>найти его пока не поздно<br>изволь',hint:'иди на запах металлических кастрюль',o:['пароль'],l:'0',h:false,startTime:'2022-12-31T13:00:00.000Z',endTime:'2022-12-31T15:00:00.000Z'},{i:2,text:'внизу загадочное слово<br>динь-динь звенит гудит трубой<br>и унесёт тебя дорогой<br>какой<br><br>"нвтыяйчос"',hint:'св*****ый',o:['святочный'],l:'0',h:false,startTime:'2022-12-31T15:00:00.000Z',endTime:'2022-12-31T17:00:00.000Z'},{i:3,text:'настало время приключений<br>сходить послушать помечтать<br>когда красиво снег нападал<br>узнать',hint:'машина споёт тебе',o:['рождество','на рождество'],l:'9',h:false,startTime:'2022-12-31T17:00:00.000Z',endTime:'2022-12-31T19:00:00.000Z'},{i:4,text:'а помнишь ты тот день и месяц<br>среди поешь и не реви<br>когда последний раз признались<br>в любви',hint:'проверь в истории сообщений',o:['15 декабря','15 декабря 2022','15 декабря 2022 года','15.12','15 12','1512','15.12.2022','15 12 2022','15122022','15 декабря 2022г.','15 декабря 2022 г.','15 декабря 2022г','15 декабря 2022 г'],l:'1',h:false,startTime:'2022-12-31T19:00:00.000Z',endTime:'2022-12-31T21:00:00.000Z'},{i:5,text:'там может зло быть или чудо<br>быть может кот живой иль нет<br>открой его чтобы найти свой<br>ответ',hint:'проверь почтовый ящик',o:['кровать'],l:'1',h:false,startTime:'2022-12-31T21:00:00.000Z',endTime:'2022-12-31T22:50:00.000Z'}]}u=()=>{const e=Date.now();const t=this.T(e);const r=this.p(e,t);const s=this.getTime(r,e,t);const n=this.m(r,t);this.g(r,s,n);button.onclick=()=>{if(t.o.includes(input.value.toLowerCase())){input.value='правильно!';t.h=true;localStorage.setItem('new-year-2022-quest',JSON.stringify(this.t))}else{input.value='неправильно'}setTimeout(()=>input.value='',1e3)};setTimeout(this.u,1e3)};T=t=>{return this.t.find(e=>new Date(e.startTime)<=t&&new Date(e.endTime)>t)};p=(e,t)=>{if(e<new Date(this.t[0].startTime))return'before';else if(!t)return'after';else if(t.i===5&&t.h)return'victory';else if(t.h)return'solved';else if(new Date(t.endTime)-e<9e5)return'in progress close to end';else return'in progress'};getTime=(e,t,r)=>{let s;switch(e){case'before':s=new Date(new Date(this.t[0].startTime)-t);break;case'solved':case'in progress':case'in progress close to end':s=new Date(new Date(r.endTime)-t);break;case'victory':case'after':default:}if(!s)return'';const n=s.getDate()-1;const i=s.getHours()-1+n*24;const a=s.getMinutes();const o=s.getSeconds();return`${i}:${c(a)}:${c(o)}`};m=(e,t)=>{let r='';switch(e){case'before':r='<h4>Задания начнутся через</h4>';break;case'solved':r=`<p class="secret">${t.l}</p>`+'<br>'+'<h4>Следующее задание начнётся через</h4>';break;case'in progress':r='<h4>Задание:</h4>'+'<br>'+t.text+'<br><br>'+'<h4>Время задания истечёт через</h4>';break;case'in progress close to end':r='<h4>Задание:</h4>'+'<br>'+t.text+'<br><br>'+'<h4>Подсказка:</h4>'+'<br>'+t.hint+'<br><br>'+'<h4>Время задания истечёт через</h4>';break;case'victory':r='<p class="secret">Победа!</p>'+'<br><br>';case'after':r+=`<p class="secret">${this.t.map(e=>e.h?e.l:'*').join(' ')}</p>`;break;default:r='Вы кто такие? Я вас не звал!'}return r};g=(e,t,r)=>{text.innerHTML=r;timer.value=t;if(e==='in progress'||e==='in progress close to end'){input.classList.remove('hidden');button.classList.remove('hidden')}else{input.classList.add('hidden');button.classList.add('hidden')}}}function c(e){return e<10?'0'+e:e}(new e).u();