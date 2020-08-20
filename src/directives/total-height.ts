import { DirectiveOptions } from "vue";

const getHeight = (): number => {
  const h = window.innerHeight;
  const header = 70;
  return Math.abs(h - header);
};

const directive: DirectiveOptions = {
  inserted(el) {
    el.style.minHeight = `${getHeight()}px`;

    window.addEventListener("resize", () => {
      el.style.minHeight = `${getHeight()}px`;
    });
  }
};

export default directive;
