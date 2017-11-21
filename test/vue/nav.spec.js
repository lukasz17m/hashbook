import Vuex from 'vuex';
import extend from 'extend';
import { expect } from 'chai';
import { mount, createLocalVue } from 'vue-test-utils';
import App from '@/components/App.vue';
import NavLeftItems from '@/components/NavLeftItems.vue';
import NavLeftToggleCollapse from '@/components/NavLeftToggleCollapse.vue';
import NavTopBurgerButton from '@/components/NavTopBurgerButton.vue';
import store from '@/store';
import state from '@/store/state';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('Nav', () => {
  const initialState = extend(true, {}, state);

  let wrapper;

  beforeEach(() => {
    store.replaceState(extend(true, {}, initialState));

    wrapper = mount(App, { store, localVue });
  });

  describe('Burger button', () => {
    it('hides left menu when burger button is clicked', () => {
      const burgerBtn = wrapper.find('.burger-button');
      const leftNav = wrapper.find('.left-nav');

      expect(wrapper.vm.$store.getters.leftNav).to.be.true;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('hidden')).to.be.false;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '0'))
        .to.be.true;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '-1'))
        .to.be.false;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '0'))
        .to.be.true;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '-1'))
        .to.be.false;

      burgerBtn.trigger('click');

      expect(wrapper.vm.$store.getters.leftNav).to.be.false;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('hidden')).to.be.true;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '0'))
        .to.be.false;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '-1'))
        .to.be.true;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '0'))
        .to.be.false;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '-1'))
        .to.be.true;
    });

    it('shows left menu when burger button is clicked', () => {
      store.replaceState(extend(true, {}, initialState, { leftNav: false }));

      wrapper = mount(App, { store, localVue });

      const burgerBtn = wrapper.find('.burger-button');
      const leftNav = wrapper.find('.left-nav');

      expect(wrapper.vm.$store.getters.leftNav).to.be.false;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('hidden')).to.be.true;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '0'))
        .to.be.false;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '-1'))
        .to.be.true;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '0'))
        .to.be.false;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '-1'))
        .to.be.true;

      burgerBtn.trigger('click');

      expect(wrapper.vm.$store.getters.leftNav).to.be.true;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('hidden')).to.be.false;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '0'))
        .to.be.true;

      expect(leftNav.find('.new-note').hasAttribute('tabindex', '-1'))
        .to.be.false;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '0'))
        .to.be.true;

      expect(leftNav.find('.collapse').hasAttribute('tabindex', '-1'))
        .to.be.false;
    });
  });

  describe('Components', () => {
    it('contains NavTopBurgerButton component which is a `div` element', () => {
      expect(wrapper.find('.left-nav').contains(NavTopBurgerButton)).to.be.true;
      expect(wrapper.find(NavTopBurgerButton).is('div')).to.be.true;

      expect(wrapper.find(NavTopBurgerButton).hasClass('burger-button'))
        .to.be.true;
    });

    it('contains NavLeftItems component which is an `ul` element', () => {
      expect(wrapper.find('.left-nav').contains(NavLeftItems)).to.be.true;
      expect(wrapper.find(NavLeftItems).is('ul')).to.be.true;
      expect(wrapper.find(NavLeftItems).hasClass('left-nav__items')).to.be.true;
    });

    it('contains NavLeftItems component which contains 4 items', () => {
      const leftNavItems = wrapper.find(NavLeftItems);

      expect(leftNavItems.contains('.left-nav__item.new-note')).to.be.true;
      expect(leftNavItems.contains('.left-nav__item.hashtags')).to.be.true;
      expect(leftNavItems.contains('.left-nav__item.technologies')).to.be.true;
      expect(leftNavItems.contains('.left-nav__item.github')).to.be.true;
    });

    it(
      'contains NavLeftToggleCollapse component that is an `li` element',
      () => {
        const leftNavItems = wrapper.find(NavLeftItems);
        const leftNavTC = wrapper.find(NavLeftToggleCollapse);
        expect(leftNavItems.contains(NavLeftToggleCollapse)).to.be.true;
        expect(leftNavTC.is('li')).to.be.true;
        expect(leftNavTC.hasClass('left-nav__item collapse')).to.be.true;
      },
    );
  });

  describe('Collapse button', () => {
    it('collapses left menu when collapse button is clicked', () => {
      const paddingBox = wrapper.find('.fix-top-padding');
      const leftNav = wrapper.find('.left-nav');
      const leftNavTC = wrapper.find(NavLeftToggleCollapse);
      const leftNavTCIcon = leftNavTC.find('.fa');

      expect(wrapper.vm.$store.getters.leftNavCollapsed).to.be.false;
      expect(paddingBox.hasClass('collapsed')).to.be.false;
      expect(paddingBox.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNavTC.hasClass('collapse')).to.be.true;
      expect(leftNavTC.hasClass('uncollapse')).to.be.false;
      expect(leftNavTC.contains('.left-nav__label')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-rotate-180')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-3x')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-4x')).to.be.false;

      leftNavTC.trigger('click');

      wrapper.update();

      expect(wrapper.vm.$store.getters.leftNavCollapsed).to.be.true;
      expect(paddingBox.hasClass('collapsed')).to.be.true;
      expect(paddingBox.hasClass('uncollapsed')).to.be.false;
      expect(leftNav.hasClass('collapsed')).to.be.true;
      expect(leftNav.hasClass('uncollapsed')).to.be.false;
      expect(leftNavTC.hasClass('collapse')).to.be.false;
      expect(leftNavTC.hasClass('uncollapse')).to.be.true;
      expect(leftNavTC.contains('.left-nav__label')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-rotate-180')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-3x')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-4x')).to.be.true;
    });

    it('uncollapses left menu when uncollapse button is clicked', () => {
      store.replaceState(extend(true, {}, initialState, {
        leftNavCollapsed: true,
      }));

      wrapper = mount(App, { store, localVue });

      const paddingBox = wrapper.find('.fix-top-padding');
      const leftNav = wrapper.find('.left-nav');
      const leftNavTC = wrapper.find(NavLeftToggleCollapse);
      const leftNavTCIcon = leftNavTC.find('.fa');

      expect(wrapper.vm.$store.getters.leftNavCollapsed).to.be.true;
      expect(paddingBox.hasClass('collapsed')).to.be.true;
      expect(paddingBox.hasClass('uncollapsed')).to.be.false;
      expect(leftNav.hasClass('collapsed')).to.be.true;
      expect(leftNav.hasClass('uncollapsed')).to.be.false;
      expect(leftNavTC.hasClass('collapse')).to.be.false;
      expect(leftNavTC.hasClass('uncollapse')).to.be.true;
      expect(leftNavTC.contains('.left-nav__label')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-rotate-180')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-3x')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-4x')).to.be.true;

      leftNavTC.trigger('click');

      wrapper.update();

      expect(wrapper.vm.$store.getters.leftNavCollapsed).to.be.false;
      expect(paddingBox.hasClass('collapsed')).to.be.false;
      expect(paddingBox.hasClass('uncollapsed')).to.be.true;
      expect(leftNav.hasClass('collapsed')).to.be.false;
      expect(leftNav.hasClass('uncollapsed')).to.be.true;
      expect(leftNavTC.hasClass('collapse')).to.be.true;
      expect(leftNavTC.hasClass('uncollapse')).to.be.false;
      expect(leftNavTC.contains('.left-nav__label')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-rotate-180')).to.be.false;
      expect(leftNavTCIcon.hasClass('fa-3x')).to.be.true;
      expect(leftNavTCIcon.hasClass('fa-4x')).to.be.false;
    });
  });

  describe('Items labels', () => {
    it('should have label `New item` for `.new-note` selector', () => {
      const selector = wrapper.find('.new-note');
      expect(selector.find('.left-nav__label').text()).equal('New note');
    });

    it('should have label `Hashtags` for `.hashtags` selector', () => {
      const selector = wrapper.find('.hashtags');
      expect(selector.find('.left-nav__label').text()).equal('Hashtags');
    });

    it('should have label `Technologies` for `.technologies` selector', () => {
      const selector = wrapper.find('.technologies');
      expect(selector.find('.left-nav__label').text()).equal('Technologies');
    });

    it('should have label `GitHub` for `.github` selector', () => {
      const selector = wrapper.find('.github');
      expect(selector.find('.left-nav__label').text()).equal('GitHub');
    });

    it('should have label `Collapse` for `.collapse` selector', () => {
      const selector = wrapper.find('.collapse');
      expect(selector.find('.left-nav__label').text()).equal('Collapse');
    });
  });

  describe('Items icons', () => {
    it('should have `fa-pencil` icon for `.new-note` selector', () => {
      expect(wrapper.find('.new-note').contains('.fa-pencil'));
    });

    it('should have `fa-hashtag` icon for `.hashtags` selector', () => {
      expect(wrapper.find('.hashtags').contains('.fa-hashtag'));
    });

    it('should have `fa-microchip` icon for `.technologies` selector', () => {
      expect(wrapper.find('.technologies').contains('.fa-microchip'));
    });

    it('should have `fa-github` icon for `.github` selector', () => {
      expect(wrapper.find('.github').contains('.fa-github'));
    });

    it('should have `fa-angle-left` icon for `.collapse` selector', () => {
      expect(wrapper.find('.collapse').contains('.fa-angle-left'));
    });
  });

  describe('Note menu impact', () => {
    it('`New note` turns into `Save note` in edit mode', () => {
      store.replaceState(extend(true, {}, initialState, {
        notes: [
          { id: 'valid', content: 'Foobar', tags: ['foo', 'bar'] },
        ],
      }));

      wrapper = mount(App, { store, localVue });

      const button = wrapper.find('.new-note');

      expect(button.html()).to.contain('New note');

      wrapper.find('.note__menu-item.is-info').trigger('click'); // Edit button

      wrapper.update();

      expect(button.html()).to.not.contain('New note');
      expect(button.html()).to.contain('Save note');
    });
  });
});
