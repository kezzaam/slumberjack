import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { categoryData, renderIcon } from './CategoryData'
import CategorySlider from './CategorySlider'

interface Category {
  name: string
  icon: any
  color: string
  description: string
  values: string[]
}

interface CategoriesProps {
  selectedValues: { [key: string]: string }
  handleSelectValue: (categoryName: string, value: string) => void
}


 // Component for displaying and selecting categories.
export default function Categories({ selectedValues, handleSelectValue }: CategoriesProps): JSX.Element {
  
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  // category data is mapped to the categories variable array
  const categories: Category[] = categoryData

  
   // Handles the click event for a category.
  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName)
  }

  
   // Checks if a category is currently selected.
   // True if the category is selected, false otherwise.
  const isCategorySelected = (categoryName: string): boolean => {
    return categoryName === selectedCategory
  }

  
   // Checks if a value is selected for a category.
   // True if a value is selected, false otherwise.
  const isValueSelected = (categoryName: string): boolean => {
    const selectedValue = selectedValues && selectedValues[categoryName]
    return selectedValue !== undefined && selectedValue !== ''
  }

  return (
    <div className="grid grid-cols-2 justify-between my-8 mx-4 text-center">
      {/* maps through each value in selected category and returns its icon and name */}
      {categories.map((category: Category) => {
        const categorySelected = isCategorySelected(category.name)
        // this stores the selected value so it can change the parent category's icon/name
        const valueSelected = isValueSelected(category.name)

        return (
          <div key={category.name}>
            <div
              className={`bg-alabaster hover:text-[--englishlavender] hover:scale-110 ${categorySelected ? 'selected' : ''}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              <FontAwesomeIcon
                icon={isValueSelected(category.name) ? renderIcon(selectedValues[category.name]) : category.icon}
                className={`text-6xl rounded-full p-5 m-2 text-[--alabaster] ${valueSelected ? 'opacity-100' : 'opacity-75'}`}
                style={{
                  backgroundColor: valueSelected ? category.color : 'var(--heatherindigo)',
                }}
              />
              <h2 className="text-md">
                {isValueSelected(category.name) ? selectedValues[category.name] : category.name}
              </h2>
            </div>
            {categorySelected && (
              <CategorySlider
                category={category.name}
                description={category.description}
                values={category.values}
                onClickClose={() => setSelectedCategory('')}
                onSelectValue={(value: any) => handleSelectValue(category.name, value)}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
