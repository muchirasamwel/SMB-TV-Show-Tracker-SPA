(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2398d62f"],{a55b:function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-app",[r("v-card",{staticClass:"login-card container",attrs:{color:"white darken-1",light:""}},[r("v-card-title",{staticClass:"d-flex justify-content-center title"},[e.isLogin?r("span",[e._v("LOGIN")]):r("span",[e._v("CREATE ACCOUNT")])]),r("v-snackbar",{attrs:{color:"red",timeout:3e3},model:{value:e.haserror,callback:function(t){e.haserror=t},expression:"haserror"}},[e._v(" "+e._s(e.errors)+" "),r("v-btn",{attrs:{color:"red",text:""},on:{click:function(t){e.haserror=!1}}},[e._v(" X ")])],1),r("v-snackbar",{attrs:{color:"green",timeout:3e3},model:{value:e.hassuccess,callback:function(t){e.hassuccess=t},expression:"hassuccess"}},[e._v(" "+e._s(e.success)+" "),r("v-btn",{attrs:{color:"green",text:""},on:{click:function(t){e.hassuccess=!1}}},[e._v(" X ")])],1),r("v-divider"),r("v-card-text",[e.isLogin?r("v-form",{ref:"loginform",on:{submit:function(t){return t.preventDefault(),e.onLoginSubmit(t)}},model:{value:e.loginvalid,callback:function(t){e.loginvalid=t},expression:"loginvalid"}},[r("v-text-field",{attrs:{color:"green",label:"Email",type:"email",required:"",rules:e.emailrules},model:{value:e.login.email,callback:function(t){e.$set(e.login,"email",t)},expression:"login.email"}}),r("v-text-field",{attrs:{color:"green",label:"Password",type:"password",rules:e.passwordrules},model:{value:e.login.password,callback:function(t){e.$set(e.login,"password",t)},expression:"login.password"}}),r("div",{staticClass:"form-group"},[r("input",{staticClass:"btn btn-primary mx-2",attrs:{type:"submit",value:"LOGIN",disabled:!e.loginvalid}}),r("label",{staticClass:"cursor-pointer text-primary float-right",on:{click:function(t){e.isLogin=!e.isLogin}}},[e._v("Need Account??")])])],1):r("v-form",{ref:"registerform",on:{submit:function(t){return t.preventDefault(),e.onRegisterSubmit(t)}},model:{value:e.registervalid,callback:function(t){e.registervalid=t},expression:"registervalid"}},[r("v-text-field",{attrs:{color:"green",label:"Name",type:"text",rules:e.namerules},model:{value:e.register.name,callback:function(t){e.$set(e.register,"name",t)},expression:"register.name"}}),r("v-text-field",{attrs:{color:"green",label:"Email",type:"email",rules:e.emailrules},model:{value:e.register.email,callback:function(t){e.$set(e.register,"email",t)},expression:"register.email"}}),r("v-text-field",{attrs:{color:"green",label:"Password",type:"password",rules:e.passwordrules},model:{value:e.register.password,callback:function(t){e.$set(e.register,"password",t)},expression:"register.password"}}),r("div",{staticClass:"form-group"},[r("input",{staticClass:"btn btn-primary mx-2",attrs:{type:"submit",value:"Create account",disabled:!e.registervalid}}),r("label",{staticClass:"text-primary float-right cursor-pointer",on:{click:function(t){e.isLogin=!e.isLogin}}},[e._v("Back To Login")])])],1)],1)],1)],1)},i=[],a={data:function(){return{hassuccess:!1,haserror:!1,loginvalid:!0,registervalid:!0,emailrules:[function(e){return!!e||"Required."},function(e){return(e||"").length<=20||"Max 20 characters"},function(e){var t=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return t.test(e)||"Invalid e-mail."}],namerules:[function(e){return!!e||"Required."},function(e){return(e||"").length<=15||"Max 15 characters"}],passwordrules:[function(e){return!!e||"Required."},function(e){return(e||"").length<=20||"Max 20 characters"}],isLogin:!0,login:{},register:{}}},methods:{onLoginSubmit:function(){this.validatelogin()&&(this.login.table="users",this.login.action="sel",this.$store.dispatch("login",this.login))},onRegisterSubmit:function(){this.validateregister()&&(this.register.table="users",this.register.action="ins",this.$store.dispatch("signUp",this.register))},validatelogin:function(){return!!this.$refs.loginform.validate()},validateregister:function(){return!!this.$refs.registerform.validate()}},computed:{errors:function(){return this.$store.state.errors},success:function(){return this.$store.state.success}},created:function(){this.$store.dispatch("logout"),this.$store.dispatch("getLoggedUser")}},n=a,o=(r("fb14"),r("2877")),l=r("6544"),c=r.n(l),u=r("7496"),d=r("8336"),g=r("b0af"),f=r("99d9"),v=r("ce7e"),m=r("4bd4"),p=r("2db4"),b=r("8654"),h=Object(o["a"])(n,s,i,!1,null,"7e8155e8",null);t["default"]=h.exports;c()(h,{VApp:u["a"],VBtn:d["a"],VCard:g["a"],VCardText:f["b"],VCardTitle:f["c"],VDivider:v["a"],VForm:m["a"],VSnackbar:p["a"],VTextField:b["a"]})},bafa:function(e,t,r){},fb14:function(e,t,r){"use strict";var s=r("bafa"),i=r.n(s);i.a}}]);
//# sourceMappingURL=chunk-2398d62f.193ca118.js.map