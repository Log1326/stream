interface SearchViewProps {
	term: string
}
export const SearchView: React.FC<SearchViewProps> = ({ term }) => {
	return <div>{term}</div>
}
export const SearchViewSkeleton = () => <div>skeelton</div>
