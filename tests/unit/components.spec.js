import { mount } from '@vue/test-utils'
import MovieItem from '@/components/MovieItem.vue';
import MovieDetail from '@/components/MovieDetail.vue';
import Pagination from '@/components/Pagination.vue';
import Filter from '@/components/Filter.vue';

// Assortment (far from comprehensive) of tests for each of the components
// Taken from Vue Test Utils Documentation.

describe('Pagination.vue', () => {

    const pages = 5;
    const currentPage = 2;
    
    it('renders props when passed', () => {

        const wrapper = mount(Pagination, {
            props: { pages, currentPage }
        })

        expect(wrapper.text()).toContain(pages);

        expect(wrapper.text()).toContain(currentPage);
    });


    test('emits paginate event', async () => {
        const wrapper = mount(Pagination, {
            props: { pages, currentPage }
        })

        await wrapper.vm.$nextTick();

        wrapper.vm.$emit('paginate', 'up');

        expect(wrapper.emitted('paginate')).toBeTruthy();

        expect(wrapper.emitted().paginate.length).toBe(1)

        expect(wrapper.emitted('paginate')[0]).toEqual(['up']);
    });


    test('emits paginate event', async () => {
        const wrapper = mount(Pagination, {
            props: { pages, currentPage }
        })

        await wrapper.vm.$nextTick();

        wrapper.vm.$emit('paginate', 'down');

        expect(wrapper.emitted('paginate')).toBeTruthy();

        expect(wrapper.emitted().paginate.length).toBe(1)

        expect(wrapper.emitted('paginate')[0]).toEqual(['down']);
    });

});

describe('Filter.vue', () => {
    it('passes error boolean as prop', () => {
      const wrapper = mount(Filter, {
        propsData: {
          error: false
        }
      })
      expect(wrapper.props().error).toBe(false);
    })
  
    it('passes error boolean as prop', () => {
        const wrapper = mount(Filter, {
        propsData: {
            error: true
        }
        })
        expect(wrapper.props().error).toBe(true);
    })
});

describe('MovieItem.vue', () => {

    const mockId = 'aabbcc112233';

    test(' MovieItem is a Vue instance', () => {
        const wrapper = mount(MovieItem, {
            propsData: {
                item: {
                    Title: "A Few Good Men",
                    Year: 1997,
                    imdbID: mockId,
                    Poster: ""
                }
            }
        });
        expect(wrapper.exists()).toBeTruthy();
    })

    test('emits itemSelected event', async () => {
        const wrapper = mount(MovieItem, {
            propsData: {
                item: {
                    Title: "A Few Good Men",
                    Year: 1997,
                    imdbID: mockId,
                    Poster: ""
                }
            }
        });

        await wrapper.vm.$nextTick();

        wrapper.vm.$emit('itemSelected', mockId);

        expect(wrapper.emitted('itemSelected')).toBeTruthy();

        expect(wrapper.emitted().itemSelected.length).toBe(1)

        expect(wrapper.emitted('itemSelected')[0]).toEqual([mockId]);
    })
});

describe('MovieItem.vue', () => {
    it('renders a div', () => {
      const wrapper = mount(MovieItem, {
        propsData: {
            item: {
                Title: "A Few Good Men",
                Year: 1997,
                imdbID: "aabbcc",
                Poster: "https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
                Language: "English",
                Runtime: "120 mins"
            }
        }
      })

      expect(wrapper.props().item.Title).toBe("A Few Good Men");
      expect(wrapper.props().item.Year).toBe(1997);
      expect(wrapper.props().item.imdbID).toBe("aabbcc");
      expect(wrapper.props().item.Poster).toBe("https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg");
      expect(wrapper.props().item.Language).toBe("English");
      expect(wrapper.props().item.Runtime).toBe("120 mins");

    })
  })