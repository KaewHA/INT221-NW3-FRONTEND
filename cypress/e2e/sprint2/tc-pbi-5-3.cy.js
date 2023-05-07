describe('TC-CREATE-ANNOUNCEMENT-3: failed - title field is over boundary data', () => {
  
    it('should contain SAS and Timezone',()=>{
      cy.visit('/admin/announcement')

      cy.contains('SAS') ;
      cy.contains('Timezone') ;
    }) ;
  
    it('should have announcement and should not display "No Announcement".',()=>{
        cy.visit('/admin/announcement')

        cy.wait(200)
        cy.get('.ann-item').should('not.have.length',0)
        cy.should('not.include.text','No Announcement')
    })

    it('should have add button and click to open url => /admin/announcement/add',()=>{
        cy.visit('/admin/announcement')
        
        cy.wait(200)
        cy.get('.ann-button').contains('add',{matchCase: false}).should('exist').click()
        cy.url().should('contain','/admin/announcement/add')
    })

    it('should open add form and can not add a new announcment.',()=>{
        
        cy.visit('/admin/announcement/add')

        cy.get('.ann-title').type("$AAAAAAAA-BBBBBBBB-CCCCCCCC-DDDDDDDD-EEEEEEEE-FFFFFFFF-GGGGGGGG-HHHHHHHH-IIIIIIII-JJJJJJJJ-KKKKKKKK-LLLLLLLL-MMMMMMMM-NNNNNNNN-OOOOOOOO-PPPPPPPP-QQQQQQQQ-RRRRRRRR-SSSSSSSS-TTTTTTTT-UUUUUUUU-VVVVVVVV---")
        cy.get('.ann-category').select('ฝึกงาน')
        cy.get('.ann-description').type('กขฃคฅฆงจฉชซณญฎฏฐฑฒณดตถทธนบปผฝพฟภมยรลวศษ-').blur()
        cy.get('.ann-publish-date').type('2023-05-08')
        cy.get('.ann-publish-time').type('06:00')
        cy.get('.ann-button').contains(/submit|save|update|add|edit/g,{matchCase: false}).should('exist').click()
        cy.wait(200)

        cy.on('window:alert',(str)=>{
            expect(str).to.contain('There is an error')
        })
    })
  });
  