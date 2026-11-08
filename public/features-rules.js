/* Browser-local review rules. No payment, account or messaging service calls. */
(function(root){
const DAY=86400000;
const day=at=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date(at));
function ledger(s,delta,title,at){if(s.balance+delta<0)return false;s.balance+=delta;s.ledger.unshift({delta,title,at});return true;}
function reward(s,kind,at){const key=day(at);if(s.rewardDay!==key){s.rewardDay=key;s.rewards={};}const max=kind==='like'?2:1;if((s.rewards[kind]||0)>=max)return 0;const n=kind==='like'?5:kind==='daily'?3:1;s.rewards[kind]=(s.rewards[kind]||0)+1;ledger(s,n,({like:'관심 보내기',daily:'8명 확인',post:'첫 글',comment:'첫 댓글'})[kind],at);return n;}
function expire(s,at){for(const l of s.letters){if(l.direction==='out'&&!l.readAt&&!l.refunded&&at-l.at>=3*DAY){l.refunded=true;ledger(s,l.cost,'미열람 편지 반환',at);}}}
function status(l,at){if(l.declined)return '거절';if(l.refunded)return '리프 반환';if(at-(l.connectedAt||l.readAt||l.at)>=(l.connectedAt||l.readAt?7:3)*DAY)return '기간 만료';if(l.connectedAt)return '연결 완료';return l.readAt?'읽음':'읽지 않음';}
function convert(s,amount,at){if(!Number.isSafeInteger(amount)||amount<150||amount>s.points)return false;const leaves=Math.floor(amount/150);s.points-=leaves*150;s.pointLedger.unshift({delta:-leaves*150,title:'리프로 바꾸기',at});return ledger(s,leaves,'포인트 환전',at);}
function send(s,l,at){if(s.letters.some(x=>x.person===l.person&&!['거절','리프 반환','기간 만료'].includes(status(x,at))))return false;if(!ledger(s,-l.cost,l.cost===80?'초대장 보내기':'편지 보내기',at))return false;s.letters.unshift({...l,id:at+'-'+Math.random(),direction:'out',at});return true;}
function reply(s,id,body,contact,at){const l=s.letters.find(x=>x.id===id);if(!l||l.direction!=='in'||l.connectedAt||['거절','기간 만료'].includes(status(l,at)))return false;const fee=l.cost===80?0:40;if(!ledger(s,-fee,'편지 답장',at))return false;l.reply=body;l.myContact=contact;l.connectedAt=at;return true;}
const api={DAY,day,ledger,reward,expire,status,convert,send,reply};root.YahwaRules=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
