import { expect } from "chai";
import Vuetify from "vuetify";
import VueRouter from "vue-router";
import Vue from "vue";
import { shallowMount } from "@vue/test-utils";
import { mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Dialog from "@/components/dialog.vue";
import Login from "@/views/Login.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    });
    //expect(wrapper.text()).to.include(msg);
  });
});

describe('Dialog Testing', function () {
  it("Test that user choice is interpleted as expected", () => {
    const msg = "new message";
    const mydialog = shallowMount(Dialog, {
    });
    expect(mydialog.text()).contain('Yes')
    expect(mydialog.text()).contain('No')
  });
});

describe('Login Testing', function () {
  it("Validation", () => {
    const Login = shallowMount(Login, {
    });
    mydialog.find('#').trigger('click');
    mydialog.vm.emitEvent();
    console.log(mydialog.text());
    //expect(mydialog.emitted().choiceMade[0]).equal(1);
  });
});
