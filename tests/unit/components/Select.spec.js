import { shallowMount } from "@vue/test-utils";
import Select from "@/components/Select";

const createWrapper = (options = []) => {
  return shallowMount(Select, {
    propsData: { options },
  });
};
// Exception test case, testing internal implementation because its crucial for the functioning of this component

describe("Dropdown select", () => {
  it("renders", () => {
    const wrapper = createWrapper();
    expect(wrapper.exists()).toBe(true);
  });

  it("renders all options", () => {
    const options = [1, 2, 3];
    const wrapper = createWrapper(options);
    const renderedOptions = wrapper.findAll(".selected__option");
    expect(renderedOptions.length).toBe(options.length);
  });

  it("correctly filters options", async () => {
    const options = ["fulminante", "really very fast"];
    const wrapper = createWrapper(options);
    wrapper.setData({ search: "fulm" });
    expect(wrapper.vm.filteredOptions).toEqual(["fulminante"]);
  });

  it("renders selected option", async () => {
    const options = [1];
    const wrapper = createWrapper(options);
    // initially we expect no items to be selected
    expect(wrapper.findAll(".chip").length).toBe(0);
    const labels = wrapper.findAll(".select__option-label");
    expect(labels.length).toBe(1);
    await labels.at(0).trigger("click");

    const renderedChips = wrapper.findAll(".chip");
    expect(renderedChips.length).toBe(1);
    expect(renderedChips.at(0).text()).toMatch(options[0].toString());
  });

  it("removes selected option when clicking chip", async () => {
    const wrapper = createWrapper();
    await wrapper.setData({ selected: ["foo"] });

    await wrapper.find(".chip").trigger("click");
    expect(wrapper.vm.$data.selected.length).toBe(0);
  });

  it("emits values when option is selected", async () => {
    const wrapper = createWrapper(["foo"]);
    const label = wrapper.find(".select__option-label");
    await label.trigger("click");
    await wrapper.vm.$nextTick();

    const emitted = wrapper.emitted();

    expect(emitted.input).toBeTruthy();
    expect(emitted.input.length).toBe(1);
    expect(emitted.input.flat()[0]).toEqual(["foo"]);
  });
});
