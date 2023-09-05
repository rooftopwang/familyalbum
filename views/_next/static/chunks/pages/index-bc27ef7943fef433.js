(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{5557:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(4645)}])},4645:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return eb}});var t=r(5893),i=r(9008),n=r.n(i),l=r(7294),a=r(7357),o=r(5582),c=r(1426),d=r(8334),x=r(5697),h=r.n(x),j=r(3426),p=r(2148),Z=r(8141),u=r(6242),m=r(4267),g=r(6447),y=r(5861),f=r(9661),v=r(3219);let w=e=>{let{sx:s,value:r={digit:0,difference:0}}=e,i=r.difference>0;return(0,t.jsx)(u.Z,{sx:s,children:(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{alignItems:"flex-start",direction:"row",justifyContent:"space-between",spacing:3,children:[(0,t.jsxs)(g.Z,{spacing:1,children:[(0,t.jsx)(y.Z,{color:"text.secondary",variant:"overline",children:"Annual Uploads"}),(0,t.jsx)(y.Z,{variant:"h4",children:r.digit})]}),(0,t.jsx)(f.Z,{sx:{backgroundColor:"error.main",height:56,width:56},children:(0,t.jsx)(v.Z,{children:(0,t.jsx)(Z.Z,{})})})]}),r.difference&&(0,t.jsxs)(g.Z,{alignItems:"center",direction:"row",spacing:2,sx:{mt:2},children:[(0,t.jsxs)(g.Z,{alignItems:"center",direction:"row",spacing:.5,children:[(0,t.jsx)(v.Z,{color:i?"success":"error",fontSize:"small",children:i?(0,t.jsx)(p.Z,{}):(0,t.jsx)(j.Z,{})}),(0,t.jsxs)(y.Z,{color:i?"success.main":"error.main",variant:"body2",children:[r.difference,"%"]})]}),(0,t.jsx)(y.Z,{color:"text.secondary",variant:"caption",children:"Since last year"})]})]})})};w.prototypes={sx:h().object,value:h().object.isRequired};var b=r(2912),k=r(2743),C=r(8445),S=r(7906),T=r(3184),I=r(3816),M=r(8102),_=r(295),z=r(7720),A=r(2023),P=r(3321),R=r(2377),D=r(948);let O=(0,D.ZP)("span")(e=>{let{theme:s,ownerState:r}=e,t=s.palette[r.color].alpha12,i="dark"===s.palette.mode?s.palette[r.color].main:s.palette[r.color].dark;return{alignItems:"center",backgroundColor:t,borderRadius:12,color:i,cursor:"default",display:"inline-flex",flexGrow:0,flexShrink:0,fontFamily:s.typography.fontFamily,fontSize:s.typography.pxToRem(12),lineHeight:2,fontWeight:600,justifyContent:"center",letterSpacing:.5,minWidth:20,paddingLeft:s.spacing(1),paddingRight:s.spacing(1),textTransform:"uppercase",whiteSpace:"nowrap"}}),L=e=>{let{color:s="primary",children:r,...i}=e;return(0,t.jsx)(O,{ownerState:{color:s},...i,children:r})};L.propTypes={children:h().node,color:h().oneOf(["primary","secondary","error","info","warning","success"])};var E=r(9332);let F={pets:"primary",dishes:"success",cities:"warning"},G=e=>{let{feeds:s=[],sx:r}=e,i=(0,E.useRouter)();return(0,t.jsxs)(u.Z,{sx:r,children:[(0,t.jsx)(C.Z,{title:"Latest Actions"}),(0,t.jsx)(R.L,{sx:{flexGrow:1},children:(0,t.jsx)(a.Z,{sx:{minWidth:800},children:(0,t.jsxs)(S.Z,{children:[(0,t.jsx)(T.Z,{children:(0,t.jsxs)(I.Z,{children:[(0,t.jsx)(M.Z,{children:"Author"}),(0,t.jsx)(M.Z,{children:"Title"}),(0,t.jsx)(M.Z,{sortDirection:"desc",children:"Date"}),(0,t.jsx)(M.Z,{children:"Type"})]})}),(0,t.jsx)(_.Z,{children:s.map(e=>{let s=(0,b.Z)(e.createdAt,"dd/MM/yyyy");return(0,t.jsxs)(I.Z,{hover:!0,children:[(0,t.jsx)(M.Z,{children:e.author}),(0,t.jsx)(M.Z,{children:e.title}),(0,t.jsx)(M.Z,{children:s}),(0,t.jsx)(M.Z,{children:(0,t.jsx)(L,{color:F[e.type],children:e.type})})]},e.id)})})]})})}),(0,t.jsx)(z.Z,{}),(0,t.jsx)(A.Z,{sx:{justifyContent:"flex-end"},children:(0,t.jsx)(P.Z,{color:"inherit",endIcon:(0,t.jsx)(v.Z,{fontSize:"small",children:(0,t.jsx)(k.Z,{})}),size:"small",variant:"text",onClick:()=>{i.push("/memories")},children:"View all"})})]})};G.prototype={feeds:h().array,sx:h().object};var N=r(2141),U=r(4394),W=r(8462),q=r(891),X=r(8987),B=r(9334),H=r(4674);let V=e=>{let{feeds:s=[],sx:r}=e,i=(0,E.useRouter)();return(0,t.jsxs)(u.Z,{sx:r,children:[(0,t.jsx)(C.Z,{title:"Feeds"}),(0,t.jsx)(W.Z,{children:s.map((e,r)=>{if(r>=5)return;let i=r<s.length-1,n=(0,N.Z)(new Date(e.createdAt));return(0,t.jsxs)(q.ZP,{divider:i,children:[(0,t.jsx)(X.Z,{children:e.filename?(0,t.jsx)(a.Z,{component:"img",src:"".concat(e.filename),sx:{borderRadius:1,height:48,width:48}}):(0,t.jsx)(a.Z,{sx:{borderRadius:1,backgroundColor:"neutral.200",height:48,width:48}})}),(0,t.jsx)(B.Z,{primary:e.title,primaryTypographyProps:{variant:"subtitle1"},secondary:"Updated ".concat(n," ago"),secondaryTypographyProps:{variant:"body2"}}),(0,t.jsx)(H.Z,{edge:"end",children:(0,t.jsx)(v.Z,{children:(0,t.jsx)(U.Z,{})})})]},e.id)})}),(0,t.jsx)(z.Z,{}),(0,t.jsx)(A.Z,{sx:{justifyContent:"flex-end"},children:(0,t.jsx)(P.Z,{color:"inherit",endIcon:(0,t.jsx)(v.Z,{fontSize:"small",children:(0,t.jsx)(k.Z,{})}),size:"small",variant:"text",onClick:()=>{i.push("/memories")},children:"View all"})})]})};V.propTypes={feeds:h().array,sx:h().object};var Y=r(6207),J=r(2734),K=r(1796),Q=r(7297),$=r(5152),ee=r.n($);function es(){let e=(0,Q.Z)([""]);return es=function(){return e},e}let er=ee()(()=>Promise.all([r.e(279),r.e(229)]).then(r.bind(r,7229)),{loadableGenerated:{webpack:()=>[7229]},ssr:!1,loading:()=>null}),et=(0,D.ZP)(er)(es());var ei=r(4559);let en=()=>{let e=(0,J.Z)(),s=(0,l.useMemo)(()=>{let e=[],s=0;for(;s<12;){let r=(0,ei.Z)(new Date,s);e.unshift((0,b.Z)(r,"MMM")),s+=1}return e},[]);return{chart:{background:"transparent",stacked:!1,toolbar:{show:!1}},colors:[e.palette.primary.main,(0,K.Fq)(e.palette.primary.main,.25)],dataLabels:{enabled:!1},fill:{opacity:1,type:"solid"},grid:{borderColor:e.palette.divider,strokeDashArray:2,xaxis:{lines:{show:!1}},yaxis:{lines:{show:!0}}},legend:{show:!0},plotOptions:{bar:{columnWidth:"60px"}},stroke:{colors:["transparent"],show:!0,width:2},theme:{mode:e.palette.mode},xaxis:{axisBorder:{color:e.palette.divider,show:!0},axisTicks:{color:e.palette.divider,show:!0},categories:s,labels:{offsetY:5,style:{colors:e.palette.text.secondary}}},yaxis:{labels:{formatter:e=>"".concat(e),offsetX:-10,style:{colors:e.palette.text.secondary}}}}},el=e=>{let{chartSeries:s=[{name:"This year",data:[0,0,0,0,0,0,0,0,0,0,0,0,0]},{name:"Last year",data:[0,0,0,0,0,0,0,0,0,0,0,0,0]}],sx:r}=e,i=en();return(0,t.jsxs)(u.Z,{sx:r,children:[(0,t.jsx)(C.Z,{action:(0,t.jsx)(P.Z,{color:"inherit",size:"small",startIcon:(0,t.jsx)(v.Z,{fontSize:"small",children:(0,t.jsx)(Y.Z,{})}),children:"Sync"}),title:"Activity History"}),(0,t.jsx)(m.Z,{children:(0,t.jsx)(et,{height:350,options:i,series:s,type:"bar",width:"100%"})}),(0,t.jsx)(z.Z,{}),(0,t.jsx)(A.Z,{sx:{justifyContent:"flex-end"},children:(0,t.jsx)(P.Z,{color:"inherit",endIcon:(0,t.jsx)(v.Z,{fontSize:"small",children:(0,t.jsx)(k.Z,{})}),size:"small",children:"Overview"})})]})};el.protoTypes={chartSeries:h().array.isRequired,sx:h().object};var ea=r(105),eo=r(1458);let ec=e=>{let{value:s={digit:0,progress:0},sx:r}=e;return(0,t.jsx)(u.Z,{sx:r,children:(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{alignItems:"flex-start",direction:"row",justifyContent:"space-between",spacing:3,children:[(0,t.jsxs)(g.Z,{spacing:1,children:[(0,t.jsx)(y.Z,{color:"text.secondary",gutterBottom:!0,variant:"overline",children:"Monthly Goal"}),(0,t.jsxs)(y.Z,{variant:"h4",children:[s.digit,"%"]})]}),(0,t.jsx)(f.Z,{sx:{backgroundColor:"warning.main",height:56,width:56},children:(0,t.jsx)(v.Z,{children:(0,t.jsx)(ea.Z,{})})})]}),(0,t.jsx)(a.Z,{sx:{mt:3},children:(0,t.jsx)(eo.Z,{value:s.progress,variant:"determinate"})})]})})};ec.propTypes={value:h().object,sx:h().object};var ed=r(1590);let ex=e=>{let{sx:s,value:r={digit:0,difference:0}}=e,i=r.difference>0;return(0,t.jsx)(u.Z,{sx:s,children:(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{alignItems:"flex-start",direction:"row",justifyContent:"space-between",spacing:3,children:[(0,t.jsxs)(g.Z,{spacing:1,children:[(0,t.jsx)(y.Z,{color:"text.secondary",variant:"overline",children:"Monthly Uploads"}),(0,t.jsx)(y.Z,{variant:"h4",children:r.digit})]}),(0,t.jsx)(f.Z,{sx:{backgroundColor:"success.main",height:56,width:56},children:(0,t.jsx)(v.Z,{children:(0,t.jsx)(ed.Z,{})})})]}),r.difference&&(0,t.jsxs)(g.Z,{alignItems:"center",direction:"row",spacing:2,sx:{mt:2},children:[(0,t.jsxs)(g.Z,{alignItems:"center",direction:"row",spacing:.5,children:[(0,t.jsx)(v.Z,{color:i?"success":"error",fontSize:"small",children:i?(0,t.jsx)(p.Z,{}):(0,t.jsx)(j.Z,{})}),(0,t.jsxs)(y.Z,{color:i?"success.main":"error.main",variant:"body2",children:[r.difference,"%"]})]}),(0,t.jsx)(y.Z,{color:"text.secondary",variant:"caption",children:"Since last month"})]})]})})};ex.propTypes={value:h().object,sx:h().object};var eh=r(5089);let ej=e=>{let{value:s={name:"",contribute:0},sx:r}=e;return(0,t.jsx)(u.Z,{sx:r,children:(0,t.jsxs)(m.Z,{children:[(0,t.jsxs)(g.Z,{alignItems:"flex-start",direction:"row",justifyContent:"space-between",spacing:3,children:[(0,t.jsxs)(g.Z,{spacing:1,children:[(0,t.jsx)(y.Z,{color:"text.secondary",variant:"overline",children:"Contributer of Month"}),(0,t.jsx)(y.Z,{variant:"h4",children:s.name})]}),(0,t.jsx)(f.Z,{sx:{backgroundColor:"primary.main",height:56,width:56},children:(0,t.jsx)(v.Z,{children:(0,t.jsx)(eh.Z,{})})})]}),(0,t.jsx)(g.Z,{alignItems:"center",direction:"row",spacing:2,sx:{mt:2},children:(0,t.jsxs)(y.Z,{color:"text.secondary",variant:"caption",children:[s.contribute," Uploads"]})})]})})};ej.propTypes={value:h().object,sx:h().object};var ep=r(9879),eZ=r(1508),eu=r(3602);let em=e=>{let s=(0,J.Z)();return{chart:{background:"transparent"},colors:[s.palette.primary.main,s.palette.success.main,s.palette.warning.main],dataLabels:{enabled:!1},labels:e,legend:{show:!1},plotOptions:{pie:{expandOnClick:!1}},states:{active:{filter:{type:"none"}},hover:{filter:{type:"none"}}},stroke:{width:0},theme:{mode:s.palette.mode},tooltip:{fillSeriesColor:!1}}},eg=()=>{let e=(0,J.Z)(),s={Pets:(0,t.jsx)(v.Z,{children:(0,t.jsx)(ep.Z,{sx:{color:e.palette.primary.main}})}),Dishes:(0,t.jsx)(v.Z,{children:(0,t.jsx)(eZ.Z,{sx:{color:e.palette.success.main}})}),Trips:(0,t.jsx)(v.Z,{children:(0,t.jsx)(eu.Z,{sx:{color:e.palette.warning.main}})})};return s},ey=e=>{let{chartSeries:s=[0,0,0],labels:r,sx:i}=e,n=em(r),l=eg();return(0,t.jsxs)(u.Z,{sx:i,children:[(0,t.jsx)(C.Z,{title:"Memory Types"}),(0,t.jsxs)(m.Z,{children:[(0,t.jsx)(et,{height:300,options:n,series:s,type:"donut",width:"100%"}),(0,t.jsx)(g.Z,{alignItems:"center",direction:"row",justifyContent:"center",spacing:2,sx:{mt:2},children:s.map((e,s)=>{let i=r[s];return(0,t.jsxs)(a.Z,{sx:{display:"flex",flexDirection:"column",alignItems:"center"},children:[l[i],(0,t.jsx)(y.Z,{sx:{my:1},variant:"h6",children:i}),(0,t.jsxs)(y.Z,{color:"text.secondary",variant:"subtitle2",children:[e,"%"]})]},i)})})]})]})};ey.propTypes={chartSeries:h().array,labels:h().array.isRequired,sx:h().object};var ef=r(1983),ev=r(4510);let ew=()=>{let[e,s]=(0,l.useState)({}),r=(0,ef.b)();return(0,l.useEffect)(()=>{fetch((0,ev.T)()+"/statistics").then(e=>e.json()).then(e=>{s(e)}).catch(e=>{console.log(e)})},[r.isSideNavAddingMemory]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n(),{children:(0,t.jsx)("title",{children:"Overview | FamilyAlbum"})}),(0,t.jsx)(a.Z,{component:"main",sx:{flexGrow:1,py:8},children:(0,t.jsx)(o.Z,{maxWidth:"xl",children:(0,t.jsxs)(c.Z,{container:!0,spacing:3,children:[(0,t.jsx)(c.Z,{xs:12,sm:6,lg:3,children:(0,t.jsx)(w,{sx:{height:"100%"},value:e.annualUpload})}),(0,t.jsx)(c.Z,{xs:12,sm:6,lg:3,children:(0,t.jsx)(ex,{sx:{height:"100%"},value:e.monthlyUpload})}),(0,t.jsx)(c.Z,{xs:12,sm:6,lg:3,children:(0,t.jsx)(ec,{sx:{height:"100%"},value:e.monthlyGoal})}),(0,t.jsx)(c.Z,{xs:12,sm:6,lg:3,children:(0,t.jsx)(ej,{sx:{height:"100%"},value:e.contributerOfMonth})}),(0,t.jsx)(c.Z,{xs:12,md:6,lg:4,children:(0,t.jsx)(V,{feeds:e.feeds,sx:{height:"100%"}})}),(0,t.jsx)(c.Z,{xs:12,md:12,lg:8,children:(0,t.jsx)(G,{feeds:e.feeds,sx:{height:"100%"}})}),(0,t.jsx)(c.Z,{xs:12,lg:8,children:(0,t.jsx)(el,{chartSeries:e.chartData,sx:{height:"100%"}})}),(0,t.jsx)(c.Z,{xs:12,md:6,lg:4,children:(0,t.jsx)(ey,{chartSeries:e.types,labels:["Pets","Dishes","Trips"],sx:{height:"100%"}})})]})})})]})};ew.getLayout=e=>(0,t.jsx)(d.A,{children:e});var eb=ew}},function(e){e.O(0,[394,404,29,71,510,334,774,888,179],function(){return e(e.s=5557)}),_N_E=e.O()}]);