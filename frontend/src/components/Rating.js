/* eslint-disable import/prefer-default-export */
const Rating = {
    render: (props) => {
        if (!props.value) {
            return '<div></div>'
        }
        return `
    <div class="rating">
    <span>
    <i class="${
        props.value >= 1
            ? 'fa fa-star'
            : props.value >= 0.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
    }">
    </i>
    </span>
        <span>
    <i class="${
        props.value >= 2
            ? 'fa fa-star'
            : props.value >= 1.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
    }">
    </i>
    </span>
        <span>
    <i class="${
        props.value >= 3
            ? 'fa fa-star'
            : props.value >= 2.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
    }">
    </i>
    </span>
        <span>
    <i class="${
        props.value >= 4
            ? 'fa fa-star'
            : props.value >= 3.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
    }">
    </i>
    </span>
        <span>
    <i class="${
        props.value >= 5
            ? 'fa fa-star'
            : props.value >= 4.5
            ? 'fa-solid fa-star-half-stroke'
            : 'fa-regular fa-star'
    }">
    </i>
    </span>
    <span>${props.text || ''}</span>
    </div>`
    },
}
export default Rating
