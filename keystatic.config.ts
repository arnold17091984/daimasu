import {config, fields, collection, singleton} from '@keystatic/core';

const isLocal = process.env.NODE_ENV === 'development';

export default config({
  storage: isLocal
    ? { kind: 'local' }
    : { kind: 'cloud' },
  cloud: {
    project: 'daimasu/daimasu-resto', // Replace with your Keystatic Cloud project slug
  },
  singletons: {
    homepage: singleton({
      label: 'Homepage',
      path: 'content/homepage',
      format: 'json',
      schema: {
        // Hero Section
        hero: fields.object(
          {
            subtitle: fields.text({label: 'Subtitle', multiline: true}),
            tagline: fields.text({label: 'Tagline'}),
            description: fields.text({label: 'Description', multiline: true}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.url({label: 'Button Link'}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'}),
            japaneseText3: fields.text({label: 'Japanese Text 3'}),
            japaneseText4: fields.text({label: 'Japanese Text 4'})
          },
          {label: 'Hero Section'}
        ),

        // Tatler Awards Section
        tatlerAwards: fields.object(
          {
            awardedBy: fields.text({label: 'Awarded By Label'}),
            country: fields.text({label: 'Country'}),
            year: fields.text({label: 'Year'}),
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true}),
            japaneseText: fields.text({label: 'Japanese Text'})
          },
          {label: 'Tatler Awards Section'}
        ),

        // Art of Ingredient Section
        artOfIngredient: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true}),
            japaneseText: fields.text({label: 'Japanese Text'})
          },
          {label: 'Art of Ingredient Section'}
        ),

        // Sake Section
        sakeSection: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.text({label: 'Button Link'}),
            japaneseText: fields.text({label: 'Japanese Text'})
          },
          {label: 'Sake Section'}
        ),

        // Quiet Experience Section
        quietExperience: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.text({label: 'Button Link'}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'})
          },
          {label: 'Quiet Experience Section'}
        ),

        // Membership Section
        membership: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.text({label: 'Button Link'})
          },
          {label: 'Membership Section'}
        ),

        // GrabFood Section
        grabFood: fields.object(
          {
            title: fields.text({label: 'Title'}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.url({label: 'Button Link'})
          },
          {label: 'GrabFood Section'}
        ),

        // Location Section
        location: fields.object(
          {
            title: fields.text({label: 'Title'}),
            address: fields.text({label: 'Address', multiline: true}),
            contactNo: fields.text({label: 'Contact Number'}),
            email: fields.text({label: 'Email'}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.url({label: 'Button Link'})
          },
          {label: 'Location Section'}
        )
      }
    }),

    // Our Rooms Page
    ourRooms: singleton({
      label: 'Our Rooms',
      path: 'content/our-rooms',
      format: 'json',
      schema: {
        // Hero Section
        hero: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            subtitle: fields.text({label: 'Subtitle'}),
            description: fields.text({label: 'Description', multiline: true}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'}),
            japaneseText3: fields.text({label: 'Japanese Text 3'})
          },
          {label: 'Hero Section'}
        ),

        // Layout & Flow Section
        layoutFlow: fields.object(
          {
            title: fields.text({label: 'Title'})
          },
          {label: 'Layout & Flow Section'}
        ),

        // Room Details Section
        roomDetails: fields.object(
          {
            title: fields.text({label: 'Title'}),
            description: fields.text({label: 'Description', multiline: true})
          },
          {label: 'Room Details Section'}
        ),

        // VIP Rooms
        vipRooms: fields.object(
          {
            title: fields.text({label: 'Title'}),
            capacity: fields.text({label: 'Capacity'}),
            description: fields.text({label: 'Description', multiline: true}),
            tagline1: fields.text({label: 'Japanese Tagline 1'}),
            tagline2: fields.text({label: 'Japanese Tagline 2'}),
            buttonText: fields.text({label: 'Button Text'})
          },
          {label: 'VIP Rooms'}
        ),

        // Tatami Rooms
        tatamiRooms: fields.object(
          {
            title: fields.text({label: 'Title'}),
            capacity: fields.text({label: 'Capacity'}),
            description: fields.text({label: 'Description', multiline: true}),
            tagline1: fields.text({label: 'Japanese Tagline 1'}),
            tagline2: fields.text({label: 'Japanese Tagline 2'}),
            buttonText: fields.text({label: 'Button Text'})
          },
          {label: 'Tatami Rooms'}
        ),

        // Sushi Counter
        sushiCounter: fields.object(
          {
            title: fields.text({label: 'Title'}),
            capacity: fields.text({label: 'Capacity'}),
            description: fields.text({label: 'Description', multiline: true}),
            tagline1: fields.text({label: 'Japanese Tagline 1'}),
            tagline2: fields.text({label: 'Japanese Tagline 2'}),
            buttonText: fields.text({label: 'Button Text'})
          },
          {label: 'Sushi Counter'}
        )
      }
    }),

    // About Us Page
    aboutUs: singleton({
      label: 'About Us',
      path: 'content/about-us',
      format: 'json',
      schema: {
        // Hero Section
        hero: fields.object(
          {
            title: fields.text({label: 'Title'}),
            subtitle: fields.text({label: 'Subtitle'}),
            description: fields.text({label: 'Description', multiline: true}),
            buttonText: fields.text({label: 'Button Text'}),
            buttonLink: fields.url({label: 'Button Link'}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'}),
            japaneseText3: fields.text({label: 'Japanese Text 3'}),
            japaneseText4: fields.text({label: 'Japanese Text 4'})
          },
          {label: 'Hero Section'}
        ),

        // About Us Title
        aboutUsTitle: fields.text({label: 'About Us Title'}),

        // At Daimasu Section
        atDaimasu: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true})
          },
          {label: 'At Daimasu Section'}
        ),

        // Crafted with Precision Section
        craftedWithPrecision: fields.object(
          {
            title: fields.text({label: 'Title'}),
            description: fields.text({label: 'Description', multiline: true})
          },
          {label: 'Crafted with Precision Section'}
        ),

        // More Than a Meal Section
        moreThanAMeal: fields.object(
          {
            title: fields.text({label: 'Title'}),
            description: fields.text({label: 'Description', multiline: true}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'}),
            japaneseText3: fields.text({label: 'Japanese Text 3'}),
            japaneseText4: fields.text({label: 'Japanese Text 4'})
          },
          {label: 'More Than a Meal Section'}
        ),

        // Meet Our Staff Section
        meetOurStaff: fields.object(
          {
            title: fields.text({label: 'Title'})
          },
          {label: 'Meet Our Staff Section'}
        )
      }
    }),

    // Membership Page
    membership: singleton({
      label: 'Membership',
      path: 'content/membership',
      format: 'json',
      schema: {
        // Hero Section
        hero: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            subtitle: fields.text({label: 'Subtitle'}),
            description: fields.text({label: 'Description', multiline: true}),
            registerButtonText: fields.text({label: 'Register Button Text'}),
            registerButtonLink: fields.url({label: 'Register Button Link'}),
            benefitsButtonText: fields.text({label: 'Benefits Button Text'}),
            benefitsButtonLink: fields.text({label: 'Benefits Button Link'}),
            japaneseText1: fields.text({label: 'Japanese Text 1'}),
            japaneseText2: fields.text({label: 'Japanese Text 2'}),
            japaneseText3: fields.text({label: 'Japanese Text 3'}),
            japaneseText4: fields.text({label: 'Japanese Text 4'}),
            japaneseText5: fields.text({label: 'Japanese Text 5'})
          },
          {label: 'Hero Section'}
        ),

        // Program Concept Section
        programConcept: fields.object(
          {
            title: fields.text({label: 'Title', multiline: true}),
            description: fields.text({label: 'Description', multiline: true})
          },
          {label: 'Program Concept Section'}
        )
      }
    }),

    // Footer
    footer: singleton({
      label: 'Footer',
      path: 'content/footer',
      format: 'json',
      schema: {
        // Hours
        hours: fields.object(
          {
            line1: fields.text({label: 'Line 1'}),
            line2: fields.text({label: 'Line 2'})
          },
          {label: 'Operating Hours'}
        ),

        // Contact Button
        contactButton: fields.object(
          {
            text: fields.text({label: 'Button Text'}),
            link: fields.url({label: 'Button Link'})
          },
          {label: 'Contact Button'}
        ),

        // Social Links
        socialLinks: fields.object(
          {
            facebookUrl: fields.url({label: 'Facebook URL'}),
            instagramUrl: fields.url({label: 'Instagram URL'})
          },
          {label: 'Social Links'}
        ),

        // Copyright
        copyright: fields.text({label: 'Copyright Text'})
      }
    })
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: {contentField: 'content'},
      schema: {
        title: fields.slug({name: {label: 'Title'}}),
        summary: fields.text({label: 'Summary', multiline: true}),
        publishedDate: fields.date({label: 'Published Date'}),
        coverImage: fields.image({
          label: 'Cover Image',
          directory: 'public/images/posts',
          publicPath: '/images/posts'
        }),
        content: fields.markdoc({
          label: 'Content'
        })
      }
    })
  }
});
