import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="flex flex-col items-center justify-center min-h-screen px-4">
      <div class="text-center">
        <div class="text-[120px] font-bold text-gray-300 leading-none select-none">404</div>
        <p class="text-2xl md:text-3xl font-semibold text-gray-800 mt-2">
          Oops! Page not found.
        </p>
        <p class="text-gray-600 mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <a
          routerLink="/"
          class="inline-block mt-6 px-6 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition duration-300 shadow-md"
        >
          Go Back to Login
        </a>
      </div>
    </div>
  `
})
export class NotFound {

}
