import Vuex from 'vuex';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NavTopTagsActive from '@/components/NavTopTagsActive.vue';
import NavTopTagsActiveItem from '@/components/NavTopTagsActiveItem.vue';
import NavTopTagsActiveItems from '@/components/NavTopTagsActiveItems.vue';
import TagsInactive from '@/components/TagsInactive.vue';
import TagsInactiveItem from '@/components/TagsInactiveItem.vue';
import TagsInactiveItems from '@/components/TagsInactiveItems.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Tags', () => {
  const initialState = state;

  let wrapper;

  beforeEach(() => {
    store.replaceState({ ...initialState });

    wrapper = mount(App, { store, localVue });
  });

  describe('Vuex', () => {
    it('has an array of tags in store', () => {
      expect(wrapper.vm.$store.getters.tags).to.be.an('array');
    });

    it('has an array of active tags in store', () => {
      expect(wrapper.vm.$store.getters.tagsActive).to.be.an('array');
    });
  });

  describe('Components', () => {
    describe('Active', () => {
      it('has a component `NavTopTagsActive` in `.top-nav`', () => {
        expect(wrapper.find('.top-nav').contains(NavTopTagsActive)).to.be.true;
      });

      it(
        'has a component `NavTopTagsActiveItems` in `NavTopTagsActive`',
        () => {
          store.replaceState({
            ...initialState,
            tagsActive: ['lorem'],
          });

          wrapper = mount(App, { store, localVue });

          expect(wrapper.find(NavTopTagsActive).contains(NavTopTagsActiveItems))
            .to.be.true;
        },
      );

      it(
        'has a component `NavTopTagsActiveItem` in `NavTopTagsActiveItems`',
        () => {
          store.replaceState({
            ...initialState,
            tagsActive: ['lorem'],
          });

          wrapper = mount(App, { store, localVue });

          expect(wrapper.find(NavTopTagsActiveItems)
            .contains(NavTopTagsActiveItem)).to.be.true;
        },
      );
    });

    describe('Inactive', () => {
      it('has a component `TagsInactive` in `.fix-top-paddind`', () => {
        expect(wrapper.find('.fix-top-padding').contains(TagsInactive))
          .to.be.true;
      });

      it('has a component `TagsInactiveItems` in `TagsInactive`', () => {
        store.replaceState({
          ...initialState,
          tags: ['lorem'],
          tagsInactiveVisible: true,
        });

        wrapper = mount(App, { store, localVue });

        expect(wrapper.find(TagsInactive).contains(TagsInactiveItems))
          .to.be.true;
      });

      it('has a component `TagsInactiveItem` in `TagsInactiveItems`', () => {
        store.replaceState({
          ...initialState,
          tags: ['lorem'],
          tagsInactiveVisible: true,
        });

        wrapper = mount(App, { store, localVue });

        expect(wrapper.find(TagsInactiveItems).contains(TagsInactiveItem))
          .to.be.true;
      });
    });
  });

  describe('Tags active', () => {
    it('`NavTopTagsActive` isn’t rendered when `tagsActive` is empty', () => {
      expect(wrapper.find('.top-nav').contains('.tags-active')).to.be.false;
    });

    it('`NavTopTagsActive` is rendered when `tagsActive` isn’t empty', () => {
      store.replaceState({
        ...initialState,
        tagsActive: ['lorem'],
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find('.top-nav').contains('.tags-active')).to.be.true;
    });
  });

  describe('Tags inactive', () => {
    it(
      '`TagsInactive` isn’t rendered when `tagsInactiveVisible` is false',
      () => {
        expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
          .to.be.false;
      },
    );

    it('`TagsInactive` is rendered when `tagsInactiveVisible` is true', () => {
      store.replaceState({
        ...initialState,
        tagsInactiveVisible: true,
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
        .to.be.true;
    });

    it('shows `TagsInactive` component when menu item is clicked', () => {
      expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
        .to.be.false;

      wrapper.find('.hashtags').trigger('click');

      expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
        .to.be.true;
    });

    it('hides `TagsInactive` component when menu item is clicked', () => {
      store.replaceState({
        ...initialState,
        tagsInactiveVisible: true,
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
        .to.be.true;

      wrapper.find('.hashtags').trigger('click');

      expect(wrapper.find('.fix-top-padding').contains('.tags-inactive'))
        .to.be.false;
    });

    it('contains `No tags to show` when there are no tags', () => {
      store.replaceState({
        ...initialState,
        tagsInactiveVisible: true,
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find(TagsInactive).html()).to.contain('No tags to show');
    });

    it('does not contain `No tags to show` when there are some tags', () => {
      store.replaceState({
        ...initialState,
        tags: ['lorem'],
        tagsInactiveVisible: true,
      });

      wrapper = mount(App, { store, localVue });

      expect(wrapper.find(TagsInactive).html())
        .to.not.contain('No tags to show');
    });
  });
});
