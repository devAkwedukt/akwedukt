import ColorExamples from "@/components/uikit/ColorExamples";
import ButtonExamples from "@/components/uikit/ButtonExamples";
import IconExamples from "@/components/uikit/IconExamples";
import { MenuItemExamples } from "@/components/uikit/MenuItemExamples";
import { IconButtonExamples } from "@/components/uikit/IconButtonExamples";

export default function UIKitPage() {
  return (
    <div className="min-h-screen">
      <div className="container">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-deep-navy-blue-900 mb-2">UIKit Components</h1>
          <p className="text-lg text-gray-600 mb-6">
            Complete showcase of all UI components based on Figma design system
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
            <a
              href="#buttons"
              className="px-4 py-2 bg-ocean-green-500 text-white rounded hover:bg-ocean-green-600 transition-colors"
            >
              Buttons
            </a>
            <a
              href="#menuitem"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Menu Item
            </a>
            <a
              href="#iconbutton"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              IconButton
            </a>
            <a
              href="#icons"
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              Icons
            </a>
            <a
              href="#colors"
              className="px-4 py-2 bg-deep-navy-blue-500 text-white rounded hover:bg-deep-navy-blue-600 transition-colors"
            >
              Color Palette
            </a>
          </nav>
        </header>

        <main className="space-y-12">
          {/* Individual Component Examples */}
          <section>
            <h2 className="text-2xl font-semibold text-deep-navy-blue-800 mb-4">
              Individual Components
            </h2>
            <div className="space-y-6">
              {/* Button Examples */}
              <div
                id="buttons"
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-xl font-semibold text-deep-navy-blue-700 mb-4">
                  Button Examples
                </h3>
                <ButtonExamples />
              </div>

              <div
                id="menuitem"
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-xl font-semibold text-deep-navy-blue-700 mb-4">Menu Item</h3>
                <MenuItemExamples />
              </div>
              <div
                id="iconbutton"
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
              >
                <h3 className="text-xl font-semibold text-deep-navy-blue-700 mb-4">IconButton</h3>
                <IconButtonExamples />
              </div>

              {/* Full Component Library */}
              {/*<><div id="components" className="bg-white rounded-lg shadow-sm border border-gray-200">*/}
              {/*  <h3 className="text-xl font-semibold text-deep-navy-blue-700 p-6 pb-4">*/}
              {/*   Next Component...*/}
              {/*  </h3>*/}
              {/*</div></>*/}
            </div>
          </section>
          <section id="icons">
            <h2 className="text-2xl font-semibold text-deep-navy-blue-800 mb-4">Icons</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <IconExamples />
            </div>
          </section>
          {/* Color Palette Examples */}
          <section id="colors">
            <h2 className="text-2xl font-semibold text-deep-navy-blue-800 mb-4">Color Palette</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <ColorExamples />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
