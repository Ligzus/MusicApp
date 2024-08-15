type CategoryType = {
    params: {id: string}
}

export default function CategoryPage({ params }: CategoryType) {
    return (
        <div>
            Страница категории {params.id};
        </div>
    )
}