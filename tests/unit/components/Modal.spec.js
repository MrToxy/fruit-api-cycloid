import { shallowMount } from "@vue/test-utils";
import Modal from "@/components/Modal";

const createWrapper = (options = {}) => {
  const { open = false, defaultActions = true, persistent = false } = options;
  return shallowMount(Modal, {
    propsData: { value: open, defaultActions, persistent },
  });
};

describe("Modal", () => {
  it("shouldn't display by default", () => {
    const wrapper = createWrapper();
    const modal = wrapper.find(".modal-backdrop");
    expect(modal.isVisible()).toBe(false);
  });
  it("should display when open is true", () => {
    const wrapper = createWrapper({ open: true });
    const modal = wrapper.find(".modal-backdrop");
    expect(modal.isVisible()).toBe(true);
  });
  it("shouldn't render default actions if default-actions prop is false", () => {
    const wrapper = createWrapper({ defaultActions: false });
    const modal = wrapper.find(".modal-actions__default");
    expect(modal.exists()).toBe(false);
  });
  it("should add the persistent class when persistent prop is passed", () => {
    const wrapper = createWrapper({ persistent: true });
    const modal = wrapper.find(".modal-backdrop.modal--persistent");
    expect(modal.exists()).toBe(true);
  });
  // toggleModal is a public method since its passed as a prop to the scoped slots
  it("should display when toggleModal method is called via the default scoped slot", async () => {
    const wrapper = createWrapper();
    await wrapper.vm.toggleModal();
    expect(wrapper.find(".modal-backdrop").isVisible()).toBe(true);
  });
  it("should hide when toggleModal method is called via the default scoped slot when modal is being displayed", async () => {
    const wrapper = createWrapper({ open: true });
    await wrapper.vm.toggleModal();
    expect(wrapper.find(".modal-backdrop").isVisible()).toBe(false);
  });
  it("should hide when persistent is false and backdrop is clicked", async () => {
    const wrapper = createWrapper({ open: true });
    const backdrop = wrapper.find(".modal-backdrop");
    await backdrop.trigger("click");
    expect(backdrop.isVisible()).toBe(false);
  });
  it("shouldn't hide when persistent is true and backdrop is clicked", async () => {
    const wrapper = createWrapper({ open: true, persistent: true });
    const backdrop = wrapper.find(".modal-backdrop");
    await backdrop.trigger("click");
    expect(backdrop.isVisible()).toBe(true);
  });
});
