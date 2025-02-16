"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { faqs } from '@/data/faq'
import { Search, Mail } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordian'

const FaqComponent = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 shadow-lg py-10">
          <CardHeader>
            <CardTitle className="text-4xl font-bold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-primary">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              Find answers to common questions about our products and services.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative sm:max-w-md max-w-[270px] mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                className="pl-10 pr-4 py-2 w-full rounded-full"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <AnimatePresence>
        {filteredFaqs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Accordion type="single" collapsible className="w-full flex flex-col gap-4">
              {filteredFaqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-lg shadow-md w-full">
                  <AccordionTrigger className="px-4 py-2 hover:bg-muted/50 rounded-t-lg w-full">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 py-2 bg-background rounded-b-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-muted-foreground mt-8"
          >
            No matching FAQs found. Please try a different search term.
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mt-16 shadow-lg py-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Still have questions?</CardTitle>
            <CardDescription className="text-center">
              Can&apos;t find the answer you&apos;re looking for? Please contact our support team.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild className="rounded-full">
              <a href="mailto:parceltrade@gmail.com" className="flex items-center">
                <Mail className="mr-2 h-4 w-4" /> Contact Support
              </a>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default FaqComponent