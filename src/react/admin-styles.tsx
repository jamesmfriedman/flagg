export default /* css */ `

.flagg {
	text-align: left;
	position: relative;
	background-color: white;
	padding-bottom: 3rem;
	overflow-y: auto;
	max-height: 100vh;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
}

.flagg * {
	outline: none;
}

.flagg-flag-icon {
	color: #f44436;
	margin-right: 0.5rem;
}

.flagg-header {
	height: 4rem;
	line-height: 4rem;
	position: sticky;
	top: 0;
	background: black;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 1.5rem;
	margin-bottom: 1rem;
	z-index: 3;
}

.flagg-header .flagg-flag-icon {
	position: relative;
	top: 4px;
	margin-right: 1rem;
}

.flagg-header__name {
	font-size: 1.25rem;
	font-weight: bold;
	color: white;
	text-transform: uppercase;
	letter-spacing: 1.5px;
	display: inline-block;
	margin-right: 2rem;
}

.flagg-header__lead {
	display: flex;
	flex: 1;
	align-items: center;
}

.flagg-header__end {
	display: flex;
	align-items: center;
}

.flagg-category--search {
	position: relative;
}

.flagg-category--search:focus-within .flagg-search-icon {
	color: #f44436;
}

.flagg-search {
	height: 4rem;
	padding: 1rem;
	-webkit-appearance: none;
	font-size: 1.25rem;
	background: whitesmoke;
	border: 0;
	flex: 1;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	text-indent: 4rem;
	border-radius: 0.5rem;
}

.flagg-search-icon {
	position: relative;
	top: 4px;
	transition: 0.3s;
	z-index: 1;
}

.flagg-categories {
	padding: 0 0.5rem;
	flex: 1;
}

.flagg-category {
	padding: 1rem 1rem 1rem 2.5rem;
	
	border-radius: 0.75rem;
	max-width: 50rem;
	margin: 1rem auto;
	background: white;
}

.flagg-control {
	display: flex;
	align-items: center;
	flex: 1;
	margin-left: 0.5rem;
	justify-content: flex-end;
}

.flagg-snowflake-icon {
	color: deepskyblue;
}

.flagg-flag .flagg-flag-icon, .flagg-flag .flagg-snowflake-icon {
	transition: 0.2s;
	opacity: 0;
	transform: scale(0);	
	position: absolute;
	left: 0.6rem;
}

.flagg-flag--override .flagg-flag-icon, .flagg-flag--frozen .flagg-snowflake-icon {
	opacity: 1;
	transform: scale(0.85);
}

.flagg-control--override .flagg-flag-icon:hover, .flagg-control--override .flagg-snowflake-icon:hover {
	cursor: pointer;
	
}

.flagg-zero {
	text-align: center;
	font-size: 2rem;
	padding: 4rem;
	opacity: 0.5;
}

.flagg-category__name {
	text-transform: capitalize;
	font-size: 1.75rem;
	font-weight: bold;
	margin-bottom: 1rem;
}

.flagg-button {
	-webkit-appearance: none;
	background: none;
	color: white;
	border: 0;
	text-transform: uppercase;
	font-size: 1rem;
	font-weight: 500;
	letter-spacing: 1px;
	height: 2.25rem;
	margin: 0 0.5rem;
	cursor: pointer;
	border-radius: 9999px;
	display: inline-flex;
	align-items: center;
	justify-content: center;
}

.flagg-button:hover, .flagg-button:focus {
	background-color: rgba(255,255,255, 0.2);
}

.flagg-flag {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: space-between;
	font-size: 1.25rem;
	margin: 0 -1rem 0 -2.5rem;
	padding: 0.5rem 1rem 0.5rem 2.5rem;
	cursor: pointer;
	position: relative;
}

.flagg-flag > div:first-child {
	max-width: calc(100% - 7rem);
}

.flagg-flag:hover {
	
}

.flagg-flag__category-name {
	opacity: 0.7;
}

.flagg-flag__name {
	overflow: hidden;
	text-overflow: ellipsis;
}

.flagg-flag__flag-name {
	font-weight: 500;
	font-size: 1.125rem;
}

.flagg-flag__description {
	font-size: 0.875rem;
	opacity: 0.7;
	margin-top: 0.25rem;
}

.flagg-select {
	font-size: 1rem;
	height: 2rem;
}

.flagg-input {
	font-size: 1rem;
	text-align: center;
	line-height: 2rem;
	height: 2rem;
	padding: 0 0.5rem;
	border-radius: 0.375rem;
	border: 1px solid rgba(0,0,0,.3);
	box-sizing: border-box;
	width: 100%;
	margin-left: 1rem;
	max-width: 30rem;
	background: #f8f8f8;
}

.flagg-toggle {
	-webkit-appearance: none;
	-moz-appearance: none;
	appearance: none;
	width: 3.875rem;
	height: 1.75rem;
	display: inline-block;
	position: relative;
	border-radius: 3.125rem;
	overflow: hidden;
	outline: none;
	border: none;
	cursor: pointer;
	background-color: #A0A0A0;
	transition: background-color ease 0.3s;
	
}

.flagg-toggle:before {
	content: "on off";
	display: block;
	position: absolute;
	z-index: 2;
	width: 1.5rem;
	height: 1.5rem;
	background: #fff;
	left: 2px;
	top: 2px;
	border-radius: 50%;
	font: 0.625rem/1.5rem Helvetica;
	text-transform: uppercase;
	font-weight: bold;
	text-indent: -1.375rem;
	word-spacing: 2.3125rem;
	color: #fff;
	white-space: nowrap;
	box-shadow: 0 1px 2px rgba(0,0,0,0.2);
	transition: all cubic-bezier(0.3, 1.5, 0.7, 1) 0.3s;
}

.flagg-toggle:checked {
	background-color: limegreen;
}

.flagg-toggle:checked:before {
	left: 2.25rem;
}

.flagg-footer {
	text-align: center;
	font-size: 0.875rem;
	padding-top: 1rem;
}
`;
